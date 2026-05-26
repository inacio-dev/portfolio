import { describe, expect, it } from 'vitest'

import { cn } from './utils'

describe('cn', () => {
  it('concatena classes simples', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })

  it('faz merge de utilities Tailwind conflitantes (último vence)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('aceita arrays e objects (API do clsx)', () => {
    expect(cn(['px-2', 'py-1'], { 'font-bold': true, hidden: false })).toBe('px-2 py-1 font-bold')
  })

  it('ignora falsy', () => {
    expect(cn('px-2', false, null, undefined, '', 'py-1')).toBe('px-2 py-1')
  })

  it('lida com classes condicionais via object syntax', () => {
    const isActive = true
    const isDisabled = false
    expect(cn('base', { active: isActive, disabled: isDisabled })).toBe('base active')
  })
})
