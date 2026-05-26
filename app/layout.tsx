import type { Metadata } from 'next'

import './globals.css'

/**
 * Root layout — minimalíssimo de propósito.
 *
 * Por que existir
 * ---------------
 * O Next 16 / App Router exige um `app/layout.tsx` no topo. Mas com
 * `[locale]` segmentando a árvore, é o `app/[locale]/layout.tsx` que faz
 * o trabalho pesado (html lang, fontes, providers, GTM, header/footer).
 *
 * Este arquivo só forward dos children — não pode renderizar `<html>` /
 * `<body>` aqui porque eles vivem no layout do locale (precisamos do
 * `lang` correto por locale para acessibilidade e SEO).
 */
export const metadata: Metadata = {
  // metadata real fica em [locale]/layout.tsx — aqui só pra Next não reclamar
  title: 'Inácio Rodrigues',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
