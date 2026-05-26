import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { submitContact, type ContactFormState } from './contact'

/**
 * Mock do `next/headers` — a server action chama `headers()` para pegar
 * o IP do request. Em ambiente de teste não temos request real, então
 * devolvemos um Map com valores fake.
 */
vi.mock('next/headers', () => ({
  headers: vi.fn(async () => new Map<string, string>([['x-forwarded-for', '127.0.0.1']])),
}))

const idle: ContactFormState = { status: 'idle' }

function makeForm(partial: Record<string, string | undefined> = {}): FormData {
  const fd = new FormData()
  const defaults: Record<string, string> = {
    name: 'Maria Silva',
    email: 'maria@example.com',
    subject: 'Vaga senior',
    message: 'Olá Inácio, tenho uma oportunidade interessante.',
    consent: 'on',
    website: '',
    'cf-turnstile-response': '',
  }
  for (const [k, v] of Object.entries({ ...defaults, ...partial })) {
    if (v !== undefined) fd.set(k, v)
  }
  return fd
}

describe('submitContact', () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    // Dev mode: sem Resend nem Turnstile — server action loga e retorna sucesso
    delete process.env.RESEND_API_KEY
    delete process.env.RESEND_FROM
    delete process.env.TURNSTILE_SECRET_KEY
  })

  afterEach(() => {
    process.env = { ...originalEnv }
    vi.restoreAllMocks()
  })

  it('aceita um payload válido em modo dev (sem Resend, sem Turnstile)', async () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
    const result = await submitContact(idle, makeForm())

    expect(result).toEqual({ status: 'success' })
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('rejeita honeypot preenchido fingindo sucesso (não dá feedback ao bot)', async () => {
    const result = await submitContact(idle, makeForm({ website: 'http://spam.com' }))

    expect(result).toEqual({ status: 'success' })
  })

  it('rejeita email com formato inválido', async () => {
    const result = await submitContact(idle, makeForm({ email: 'naoeumemail' }))

    expect(result.status).toBe('invalid')
    if (result.status === 'invalid') {
      expect(result.fields.email).toBe('invalid')
    }
  })

  it('rejeita nome com menos de 2 caracteres', async () => {
    const result = await submitContact(idle, makeForm({ name: 'A' }))

    expect(result.status).toBe('invalid')
    if (result.status === 'invalid') {
      expect(result.fields.name).toBe('invalid')
    }
  })

  it('rejeita mensagem muito curta', async () => {
    const result = await submitContact(idle, makeForm({ message: 'curta' }))

    expect(result.status).toBe('invalid')
    if (result.status === 'invalid') {
      expect(result.fields.message).toBe('invalid')
    }
  })

  it('rejeita falta de consentimento LGPD', async () => {
    const result = await submitContact(idle, makeForm({ consent: undefined }))

    expect(result.status).toBe('invalid')
    if (result.status === 'invalid') {
      expect(result.fields.consent).toBe('invalid')
    }
  })

  it('consolida múltiplos erros num único objeto', async () => {
    const result = await submitContact(
      idle,
      makeForm({ name: '', email: 'x', message: 'a', consent: undefined }),
    )

    expect(result.status).toBe('invalid')
    if (result.status === 'invalid') {
      expect(Object.keys(result.fields).sort()).toEqual(['consent', 'email', 'message', 'name'])
    }
  })

  it('com TURNSTILE_SECRET_KEY mas sem token → erro challenge_failed', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret'

    const result = await submitContact(idle, makeForm({ 'cf-turnstile-response': '' }))

    expect(result).toEqual({ status: 'error', message: 'challenge_failed' })
  })

  it('com TURNSTILE_SECRET_KEY e token válido (mock fetch) → sucesso', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret'

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: true,
          hostname: 'localhost',
          challenge_ts: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: { 'content-type': 'application/json' },
        },
      ),
    )
    vi.spyOn(console, 'info').mockImplementation(() => {})

    const result = await submitContact(idle, makeForm({ 'cf-turnstile-response': 'tok-fake-123' }))

    expect(result).toEqual({ status: 'success' })
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('com hostname não permitido na resposta → erro challenge_failed', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret'

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: true,
          hostname: 'atacante.example.com',
        }),
        { status: 200 },
      ),
    )
    vi.spyOn(console, 'warn').mockImplementation(() => {})

    const result = await submitContact(idle, makeForm({ 'cf-turnstile-response': 'tok-replay' }))

    expect(result).toEqual({ status: 'error', message: 'challenge_failed' })
  })

  it('com Turnstile retornando success=false → erro challenge_failed', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret'

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ success: false, 'error-codes': ['invalid-input-response'] }), {
        status: 200,
      }),
    )
    vi.spyOn(console, 'warn').mockImplementation(() => {})

    const result = await submitContact(idle, makeForm({ 'cf-turnstile-response': 'tok-fake-bad' }))

    expect(result).toEqual({ status: 'error', message: 'challenge_failed' })
  })
})
