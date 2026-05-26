import { describe, expect, it } from 'vitest'

import en from './en.json'
import es from './es.json'
import ptBR from './pt-BR.json'

/**
 * Parity check entre os 3 arquivos de tradução.
 *
 * Garante que: se uma key existe em pt-BR (fonte de verdade), também
 * existe em en e es — sem isso, `useTranslations` joga em runtime quando
 * o usuário troca pra inglês ou espanhol e cai numa página com key
 * faltando.
 */

type JsonObject = Record<string, unknown>

function collectKeys(obj: JsonObject, prefix = ''): string[] {
  const keys: string[] = []
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...collectKeys(value as JsonObject, path))
    } else {
      keys.push(path)
    }
  }
  return keys
}

const ptKeys = new Set(collectKeys(ptBR as unknown as JsonObject))
const enKeys = new Set(collectKeys(en as unknown as JsonObject))
const esKeys = new Set(collectKeys(es as unknown as JsonObject))

describe('messages parity', () => {
  it('en tem todas as keys de pt-BR', () => {
    const missing = [...ptKeys].filter((k) => !enKeys.has(k))
    expect(missing, `keys faltando em en: ${missing.join(', ')}`).toEqual([])
  })

  it('es tem todas as keys de pt-BR', () => {
    const missing = [...ptKeys].filter((k) => !esKeys.has(k))
    expect(missing, `keys faltando em es: ${missing.join(', ')}`).toEqual([])
  })

  it('en não tem keys extras que pt-BR não tenha', () => {
    const extras = [...enKeys].filter((k) => !ptKeys.has(k))
    expect(extras, `keys extras em en: ${extras.join(', ')}`).toEqual([])
  })

  it('es não tem keys extras que pt-BR não tenha', () => {
    const extras = [...esKeys].filter((k) => !ptKeys.has(k))
    expect(extras, `keys extras em es: ${extras.join(', ')}`).toEqual([])
  })

  it('nenhum valor de tradução está vazio', () => {
    function checkEmpty(obj: JsonObject, lang: string, path = ''): string[] {
      const empty: string[] = []
      for (const [key, value] of Object.entries(obj)) {
        const full = path ? `${path}.${key}` : key
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          empty.push(...checkEmpty(value as JsonObject, lang, full))
        } else if (typeof value === 'string' && value.trim() === '') {
          empty.push(`${lang}: ${full}`)
        }
      }
      return empty
    }

    const allEmpty = [
      ...checkEmpty(ptBR as unknown as JsonObject, 'pt-BR'),
      ...checkEmpty(en as unknown as JsonObject, 'en'),
      ...checkEmpty(es as unknown as JsonObject, 'es'),
    ]
    expect(allEmpty).toEqual([])
  })
})
