'use server'

import { headers } from 'next/headers'

import { CONTACT_EMAIL } from '@/lib/site'

/**
 * Server Action do formulário de contato.
 *
 * Anti-spam em camadas
 * --------------------
 * 1. Honeypot (`website` deve vir vazio) — pega bots burros sem custo.
 * 2. Cloudflare Turnstile invisible — validado server-side com o secret
 *    (`hostname` também é checado contra a allowlist como defesa em
 *    profundidade).
 * 3. Validação de shape (regex de email, tamanho mínimo, consent LGPD).
 *
 * Entrega
 * -------
 * Resend SDK. A escolha pelo Resend (e não SMTP direto via Nodemailer)
 * veio depois que o Outlook.com retornou `535 5.7.139 basic authentication
 * is disabled` — Microsoft desativou auth básica e exigir OAuth2 não vale
 * a pena para um form de portfólio. Resend tem free tier de 3k emails/mês,
 * setup em uma chamada, API simples.
 *
 * Sem `RESEND_API_KEY` em runtime, a server action loga a mensagem no
 * console e retorna sucesso (modo dev — facilita iteração local).
 *
 * Sem banco — portfólio não precisa de inbox persistente.
 */

export type ContactFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string }
  | { status: 'invalid'; fields: Record<string, string> }

interface ParsedInput {
  name: string
  email: string
  subject: string
  message: string
  consent: boolean
  honeypot: string
  turnstileToken: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parse(formData: FormData): ParsedInput {
  return {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '')
      .trim()
      .toLowerCase(),
    subject: String(formData.get('subject') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
    consent: formData.get('consent') === 'on',
    honeypot: String(formData.get('website') ?? ''),
    turnstileToken: String(formData.get('cf-turnstile-response') ?? ''),
  }
}

function validate(input: ParsedInput): Record<string, string> | null {
  const errors: Record<string, string> = {}
  if (input.name.length < 2) errors.name = 'invalid'
  if (!EMAIL_REGEX.test(input.email)) errors.email = 'invalid'
  if (input.message.length < 10) errors.message = 'invalid'
  if (!input.consent) errors.consent = 'invalid'
  return Object.keys(errors).length > 0 ? errors : null
}

/**
 * Hostnames aceitos pelo Turnstile — validados na resposta do siteverify
 * como defesa em profundidade contra reuso de token gerado em outro domínio.
 *
 * Em dev, a env `NEXT_PUBLIC_SITE_URL` aponta pra localhost, então o widget
 * gera token com hostname `localhost`. Em prod, `inaciorodrigues.dev.br`.
 */
const ALLOWED_TURNSTILE_HOSTS = new Set([
  'localhost',
  'inaciorodrigues.dev.br',
  'www.inaciorodrigues.dev.br',
])

interface TurnstileVerifyResponse {
  success: boolean
  hostname?: string
  challenge_ts?: string
  action?: string
  'error-codes'?: string[]
}

/**
 * Valida o token do Turnstile no endpoint oficial da Cloudflare.
 * Retorna `true` se válido OU se o secret não estiver configurado (modo
 * dev) — assim o dev consegue testar o form sem precisar setar chave.
 *
 * Doc: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn(
      '[contact] TURNSTILE_SECRET_KEY não configurada — aceitando submission sem challenge',
    )
    return true
  }
  if (!token) return false

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
      remoteip: ip,
    })
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    })
    const json = (await res.json()) as TurnstileVerifyResponse

    if (!json.success) {
      console.warn('[contact] turnstile rejeitou:', json['error-codes'])
      return false
    }

    if (json.hostname && !ALLOWED_TURNSTILE_HOSTS.has(json.hostname)) {
      console.warn('[contact] turnstile hostname não permitido:', json.hostname)
      return false
    }

    return true
  } catch (error) {
    console.error('[contact] erro ao verificar turnstile', error)
    return false
  }
}

/**
 * Endereço `from` usado nos emails enviados via Resend.
 *
 * - Sem domínio próprio verificado: `onboarding@resend.dev` (Resend permite
 *   por padrão pra testes — só consegue enviar pro email associado à conta).
 * - Com domínio próprio verificado (`inaciorodrigues.dev.br`): `RESEND_FROM`
 *   override no `.env.prod` apontando, p.ex., `Portfólio <contato@inaciorodrigues.dev.br>`.
 *
 * Doc: https://resend.com/docs/dashboard/domains/introduction
 */
const RESEND_DEFAULT_FROM = 'Portfólio <onboarding@resend.dev>'

async function deliver(input: ParsedInput, ip: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const fromAddress = process.env.RESEND_FROM ?? RESEND_DEFAULT_FROM

  const text =
    `Nova mensagem do portfólio\n\n` +
    `Nome: ${input.name}\n` +
    `Email: ${input.email}\n` +
    `Assunto: ${input.subject || '(sem assunto)'}\n` +
    `IP: ${ip}\n\n` +
    `Mensagem:\n${input.message}\n`

  if (!apiKey) {
    console.info('[contact] RESEND_API_KEY não configurada — gravando no console:\n', text)
    return
  }

  // Dynamic import: deixa o tree-shaking remover o SDK quando a key não
  // está configurada (build de preview, branch sem secret, etc).
  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: CONTACT_EMAIL,
    replyTo: input.email,
    subject: `[portfólio] ${input.subject || 'Novo contato'}`,
    text,
  })

  if (error) {
    // O SDK do Resend não lança em erros HTTP — retorna no campo `error`.
    // Levantamos manualmente para o catch da `submitContact` capturar.
    throw new Error(`resend: ${error.name} — ${error.message}`)
  }
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const input = parse(formData)
  const requestHeaders = await headers()
  const ip = requestHeaders.get('x-forwarded-for') ?? requestHeaders.get('x-real-ip') ?? 'unknown'

  // Honeypot — bot preenche, humano não vê.
  if (input.honeypot) {
    return { status: 'success' }
  }

  const fieldErrors = validate(input)
  if (fieldErrors) {
    return { status: 'invalid', fields: fieldErrors }
  }

  const challengeOk = await verifyTurnstile(input.turnstileToken, ip)
  if (!challengeOk) {
    return { status: 'error', message: 'challenge_failed' }
  }

  try {
    await deliver(input, ip)
    return { status: 'success' }
  } catch (error) {
    console.error('[contact] falha ao entregar mensagem', error)
    return { status: 'error', message: 'delivery_failed' }
  }
}
