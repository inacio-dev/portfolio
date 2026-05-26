import { describe, expect, it } from 'vitest'

import ptBR from '@/messages/pt-BR.json'

import { PROJECTS } from './projects'

/**
 * Testes de integridade do catálogo de projetos.
 *
 * O catálogo tem invariants que se quebrados levam a runtime errors no
 * `t(\`items.${key}.title\`)` da página /projetos — esses testes são a
 * primeira linha de defesa.
 */
describe('PROJECTS catalog', () => {
  it('todas as keys têm tradução em pt-BR', () => {
    for (const project of PROJECTS) {
      const item = (ptBR.Projects.items as Record<string, unknown>)[project.key]
      expect(item, `falta tradução para ${project.key}`).toBeTruthy()
    }
  })

  it('cada projeto traduzido tem title, subtitle e description', () => {
    for (const project of PROJECTS) {
      const item = (
        ptBR.Projects.items as Record<
          string,
          { title: string; subtitle: string; description: string }
        >
      )[project.key]
      expect(item.title, `${project.key} sem title`).toBeTruthy()
      expect(item.subtitle, `${project.key} sem subtitle`).toBeTruthy()
      expect(item.description, `${project.key} sem description`).toBeTruthy()
    }
  })

  it('repoUrl é URL absoluta válida', () => {
    for (const project of PROJECTS) {
      if (project.repoUrl) {
        expect(() => new URL(project.repoUrl as string)).not.toThrow()
      }
    }
  })

  it('liveUrl, quando presente, é URL absoluta ou path interno começando com "/"', () => {
    for (const project of PROJECTS) {
      if (project.liveUrl) {
        const url = project.liveUrl
        const isInternal = url.startsWith('/')
        const isAbsolute = (() => {
          try {
            new URL(url)
            return true
          } catch {
            return false
          }
        })()
        expect(isInternal || isAbsolute, `${project.key} liveUrl inválido: ${url}`).toBe(true)
      }
    }
  })

  it('stack nunca é vazio (todo projeto tem ao menos uma tech)', () => {
    for (const project of PROJECTS) {
      expect(project.stack.length, `${project.key} sem stack`).toBeGreaterThan(0)
    }
  })

  it('keys são únicas', () => {
    const keys = PROJECTS.map((p) => p.key)
    expect(new Set(keys).size).toBe(keys.length)
  })
})
