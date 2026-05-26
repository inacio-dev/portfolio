import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cookies from 'js-cookie'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { renderWithIntl } from '@/tests/helpers/renderWithIntl'

import { CookieConsent } from './CookieConsent'

const COOKIE_NAME = 'portifolio-cookie-consent'

describe('CookieConsent', () => {
  const gtagMock = vi.fn()

  beforeEach(() => {
    Cookies.remove(COOKIE_NAME)
    gtagMock.mockReset()
    // @ts-expect-error — atribuímos diretamente em runtime de teste
    window.gtag = gtagMock
  })

  afterEach(() => {
    Cookies.remove(COOKIE_NAME)
    // @ts-expect-error — limpando window.gtag
    delete window.gtag
  })

  it('renderiza o banner quando o cookie ainda não foi setado', () => {
    renderWithIntl(<CookieConsent />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(/cookies e privacidade/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /aceitar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /recusar/i })).toBeInTheDocument()
  })

  it('não renderiza nada se cookie === accepted', () => {
    Cookies.set(COOKIE_NAME, 'accepted')

    renderWithIntl(<CookieConsent />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('não renderiza nada se cookie === rejected', () => {
    Cookies.set(COOKIE_NAME, 'rejected')

    renderWithIntl(<CookieConsent />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('clicar Aceitar grava cookie + chama gtag consent update granted', async () => {
    const user = userEvent.setup()
    renderWithIntl(<CookieConsent />)

    await user.click(screen.getByRole('button', { name: /aceitar/i }))

    expect(Cookies.get(COOKIE_NAME)).toBe('accepted')
    expect(gtagMock).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('clicar Recusar grava cookie SEM chamar gtag update (default já é denied)', async () => {
    const user = userEvent.setup()
    renderWithIntl(<CookieConsent />)

    await user.click(screen.getByRole('button', { name: /recusar/i }))

    expect(Cookies.get(COOKIE_NAME)).toBe('rejected')
    expect(gtagMock).not.toHaveBeenCalled()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
