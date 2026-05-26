import { ChevronDown, ExternalLink } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { THESIS_REFERENCES, type ReferenceGroup } from '@/lib/thesis-references'

/**
 * Bibliografia da monografia agrupada por tipo.
 *
 * Usa `<details>` nativo — zero JS, totalmente acessível via teclado,
 * animação de expansão via CSS. Grupos default-fechados porque a lista
 * é longa (53 refs) e a maioria dos visitantes não vai expandir todas.
 *
 * Os labels dos grupos vêm de `Thesis.referencesGroups.<group>` no JSON;
 * o texto das referências em si NÃO é traduzido — convenção acadêmica
 * (autor, título e periódico aparecem na língua original).
 */
const GROUP_ORDER: readonly ReferenceGroup[] = [
  'book',
  'article',
  'proceedings',
  'undergrad',
  'graduate',
  'manual',
  'misc',
]

export async function ThesisReferences() {
  const t = await getTranslations('Thesis')
  const total = Object.values(THESIS_REFERENCES).reduce((acc, list) => acc + (list?.length ?? 0), 0)
  const groups = GROUP_ORDER.filter((g) => (THESIS_REFERENCES[g]?.length ?? 0) > 0)

  return (
    <section className="mt-20">
      <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('referencesTitle')}</h2>
      <p className="mt-3 max-w-4xl text-muted-foreground">
        {t('referencesDescription', { count: total })}
      </p>

      <div className="mt-8 space-y-3">
        {groups.map((group) => {
          // Safe non-null: `groups` já filtrou só os existentes acima.
          const items = THESIS_REFERENCES[group] ?? []
          return (
            <details
              key={group}
              className="group rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-display text-base font-semibold marker:hidden">
                <span className="flex items-center gap-3">
                  {t(`referencesGroups.${group}`)}
                  <span className="font-mono text-xs font-normal text-muted-foreground">
                    {items.length}
                  </span>
                </span>
                <ChevronDown
                  className="size-4 text-muted-foreground transition-transform duration-200 ease-out group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>

              <ol className="list-decimal space-y-3 border-t border-border px-4 py-4 pl-10 text-sm text-muted-foreground marker:font-mono marker:text-xs marker:text-primary">
                {items.map((ref, i) => (
                  <li key={i} className="leading-relaxed">
                    {ref.author && <span>{ref.author}. </span>}
                    {ref.title && <em className="text-foreground">{ref.title}</em>}
                    {ref.source && <span>. {ref.source}</span>}
                    {ref.year && <span>, {ref.year}</span>}
                    {ref.extra && <span>, {ref.extra}</span>}
                    {ref.url ? (
                      <>
                        .{' '}
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 text-primary hover:underline"
                        >
                          {ref.url}
                          <ExternalLink className="size-3" aria-hidden="true" />
                        </a>
                      </>
                    ) : (
                      '.'
                    )}
                  </li>
                ))}
              </ol>
            </details>
          )
        })}
      </div>
    </section>
  )
}
