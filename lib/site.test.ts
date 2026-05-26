import { describe, expect, it } from 'vitest'

import { CONTACT_EMAIL, mailtoUrl, WHATSAPP_NUMBER, whatsappUrl } from './site'

describe('whatsappUrl', () => {
  it('retorna wa.me com o número da env sem mensagem', () => {
    expect(whatsappUrl()).toBe(`https://wa.me/${WHATSAPP_NUMBER}`)
  })

  it('adiciona o ?text encodado quando passa mensagem', () => {
    const url = whatsappUrl('Olá, vi seu portfólio')
    expect(url).toBe(
      `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C%20vi%20seu%20portf%C3%B3lio`,
    )
  })

  it('preserva caracteres especiais via encodeURIComponent', () => {
    const url = whatsappUrl('a&b=c?d#e')
    expect(url).toContain('?text=a%26b%3Dc%3Fd%23e')
  })
})

describe('mailtoUrl', () => {
  it('retorna mailto puro sem options', () => {
    expect(mailtoUrl()).toBe(`mailto:${CONTACT_EMAIL}`)
  })

  it('adiciona subject quando passado', () => {
    expect(mailtoUrl({ subject: 'Oi' })).toBe(`mailto:${CONTACT_EMAIL}?subject=Oi`)
  })

  it('adiciona subject e body juntos', () => {
    const url = mailtoUrl({ subject: 'Oi', body: 'corpo' })
    expect(url).toContain('subject=Oi')
    expect(url).toContain('body=corpo')
  })

  it('preserva caracteres especiais', () => {
    const url = mailtoUrl({ subject: 'a & b' })
    // URLSearchParams usa '+' para espaço, '%26' para '&'
    expect(url).toContain('subject=a+%26+b')
  })
})
