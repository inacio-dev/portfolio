'use client'

import * as React from 'react'

import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Turnstile } from '@/components/forms/Turnstile'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { trackEvent } from '@/lib/analytics'
import { submitContact, type ContactFormState } from '@/server/actions/contact'

/**
 * Form de contato com server action (`submitContact`).
 *
 * Camadas anti-spam:
 * 1. Honeypot `<input name="website">` escondido — bots preenchem.
 * 2. Cloudflare Turnstile invisível — token injetado pelo widget no
 *    campo `cf-turnstile-response`.
 * 3. Validação server-side (formato email, tamanho mínimo, consent).
 *
 * O Turnstile só é validado de verdade se as envs estiverem setadas. Em
 * dev sem envs, a server action aceita a submission para facilitar teste.
 *
 * Uso de `useActionState` (React 19): mantém o estado retornado pela
 * server action entre renders, sem precisar de useState manual.
 */
const initialState: ContactFormState = { status: 'idle' }

/**
 * Mapping de erros de validação retornados pela server action para
 * chaves de mensagem específicas. Mantém o JSON de tradução como fonte
 * única de cópia para cada erro.
 */
const FIELD_ERROR_KEY = {
  name: 'validation.nameInvalid',
  email: 'validation.emailInvalid',
  message: 'validation.messageInvalid',
  consent: 'validation.consentInvalid',
} as const

export function ContactForm() {
  const t = useTranslations('Contact')
  const [state, formAction, isPending] = React.useActionState(submitContact, initialState)
  const formRef = React.useRef<HTMLFormElement>(null)

  // Reset do form em sucesso
  React.useEffect(() => {
    if (state.status === 'success' && formRef.current) {
      formRef.current.reset()
      trackEvent('contact_form_submitted', { result: 'success' })
    } else if (state.status === 'error') {
      trackEvent('contact_form_submitted', { result: 'error' })
    }
  }, [state.status])

  const fieldErrors = state.status === 'invalid' ? state.fields : {}
  const errorBannerMessage =
    state.status === 'error' && state.message === 'challenge_failed'
      ? t('errorChallenge')
      : t('errorDescription')

  return (
    <form ref={formRef} action={formAction} className="space-y-5" noValidate>
      {/* Honeypot — escondido para humanos, irresistível para bots ingênuos */}
      <div className="pointer-events-none absolute -left-2500 size-0 opacity-0" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field data-invalid={fieldErrors.name ? 'true' : undefined}>
          <FieldLabel htmlFor="name">{t('fieldName')}</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t('fieldNamePlaceholder')}
            required
            minLength={2}
            disabled={isPending}
          />
          {fieldErrors.name && <FieldError>{t(FIELD_ERROR_KEY.name)}</FieldError>}
        </Field>

        <Field data-invalid={fieldErrors.email ? 'true' : undefined}>
          <FieldLabel htmlFor="email">{t('fieldEmail')}</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t('fieldEmailPlaceholder')}
            required
            disabled={isPending}
          />
          {fieldErrors.email && <FieldError>{t(FIELD_ERROR_KEY.email)}</FieldError>}
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="subject">{t('fieldSubject')}</FieldLabel>
        <Input
          id="subject"
          name="subject"
          type="text"
          placeholder={t('fieldSubjectPlaceholder')}
          disabled={isPending}
        />
      </Field>

      <Field data-invalid={fieldErrors.message ? 'true' : undefined}>
        <FieldLabel htmlFor="message">{t('fieldMessage')}</FieldLabel>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder={t('fieldMessagePlaceholder')}
          required
          minLength={10}
          disabled={isPending}
        />
        {fieldErrors.message && <FieldError>{t(FIELD_ERROR_KEY.message)}</FieldError>}
      </Field>

      <Field data-invalid={fieldErrors.consent ? 'true' : undefined}>
        <FieldLabel className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="consent"
            required
            disabled={isPending}
            className="size-4 rounded border-border accent-primary"
          />
          <span className="text-muted-foreground">{t('fieldConsent')}</span>
        </FieldLabel>
        {fieldErrors.consent && (
          <FieldDescription className="text-destructive">
            {t(FIELD_ERROR_KEY.consent)}
          </FieldDescription>
        )}
      </Field>

      <Turnstile />

      <Button type="submit" disabled={isPending} size="lg" className="w-full sm:w-auto">
        {isPending ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
            {t('submitting')}
          </>
        ) : (
          t('submit')
        )}
      </Button>

      {state.status === 'success' && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-md border border-primary/30 bg-primary/10 p-4 text-sm"
        >
          <CheckCircle2 className="mt-0.5 size-4 text-primary" aria-hidden="true" />
          <div>
            <p className="font-medium text-foreground">{t('successTitle')}</p>
            <p className="mt-1 text-muted-foreground">{t('successDescription')}</p>
          </div>
        </div>
      )}

      {state.status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm"
        >
          <XCircle className="mt-0.5 size-4 text-destructive" aria-hidden="true" />
          <div>
            <p className="font-medium text-foreground">{t('errorTitle')}</p>
            <p className="mt-1 text-muted-foreground">{errorBannerMessage}</p>
          </div>
        </div>
      )}
    </form>
  )
}
