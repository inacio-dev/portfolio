import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { EVENT_PREFIX, trackEvent } from './analytics'

describe('analytics.trackEvent', () => {
  const gtagSpy = vi.fn()

  beforeEach(() => {
    gtagSpy.mockReset()
    // @ts-expect-error — em runtime de teste atribuímos diretamente
    window.gtag = gtagSpy
  })

  afterEach(() => {
    // Remove a função pra cada teste começar do zero
    // @ts-expect-error — limpando window.gtag
    delete window.gtag
  })

  it('aplica o prefixo portifolio_ ao nome do evento', () => {
    trackEvent('cta_clicked')

    expect(gtagSpy).toHaveBeenCalledOnce()
    expect(gtagSpy).toHaveBeenCalledWith('event', `${EVENT_PREFIX}cta_clicked`, undefined)
  })

  it('encaminha os params adicionais sem alterar', () => {
    trackEvent('project_clicked', { slug: 'teleoperacao', position: 1 })

    expect(gtagSpy).toHaveBeenCalledWith('event', `${EVENT_PREFIX}project_clicked`, {
      slug: 'teleoperacao',
      position: 1,
    })
  })

  it('não lança quando gtag ainda não foi carregado', () => {
    // @ts-expect-error — simula gtag ausente
    delete window.gtag

    expect(() => trackEvent('cta_clicked')).not.toThrow()
  })

  it('não lança se gtag joga exceção (tracking não pode quebrar UI)', () => {
    // @ts-expect-error — gtag que joga
    window.gtag = () => {
      throw new Error('boom')
    }

    expect(() => trackEvent('whatsapp_opened', { source: 'hero' })).not.toThrow()
  })

  it('valor de EVENT_PREFIX permanece estável', () => {
    // Mudar esse prefixo quebra a tag do GTM em produção — proteção via teste.
    expect(EVENT_PREFIX).toBe('portifolio_')
  })
})
