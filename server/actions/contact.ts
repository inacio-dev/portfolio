'use server'

import { headers } from 'next/headers'

import { CONTACT_EMAIL } from '@/lib/site'

/**
 * Server Action do formulário de contato.
 *
 * Anti-spam em camadas
 * --------------------
 * 1. Honeypot (`website` deve vir vazio) — pega bots burros sem custo.
 * 2. Cloudflare Turnstile invisible — validado server-side com o secret.
 *    Sem cookies third-party (LGPD-friendly vs reCAPTCHA).
 * 3. Validação de shape (zod-light manual).
 *
 * Entrega
 * -------
 * Se SMTP_* setado → Nodemailer (dynamic import — não força a dep na
 * bundle de quem não envia). Caso contrário, console.log (modo dev).
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
 * Valida o token do Turnstile no endpoint oficial da Cloudflare.
 * Retorna `true` se válido OU se o secret não estiver configurado (modo
 * dev) — assim o dev consegue testar o form sem precisar setar chave.
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
    const json = (await res.json()) as { success: boolean; 'error-codes'?: string[] }
    if (!json.success) {
      console.warn('[contact] turnstile rejeitou:', json['error-codes'])
    }
    return json.success === true
  } catch (error) {
    console.error('[contact] erro ao verificar turnstile', error)
    return false
  }
}

async function deliver(input: ParsedInput, ip: string): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env

  const body =
    `Nova mensagem do portfólio\n\n` +
    `Nome: ${input.name}\n` +
    `Email: ${input.email}\n` +
    `Assunto: ${input.subject || '(sem assunto)'}\n` +
    `IP: ${ip}\n\n` +
    `Mensagem:\n${input.message}\n`

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    console.info('[contact] SMTP não configurado — gravando no console:\n', body)
    return
  }

  const nodemailer = await import('nodemailer').then((m) => m.default ?? m)
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  })

  await transporter.sendMail({
    from: `"Portfólio Inácio" <${SMTP_USER}>`,
    to: CONTACT_EMAIL,
    replyTo: input.email,
    subject: `[portfólio] ${input.subject || 'Novo contato'}`,
    text: body,
  })
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
