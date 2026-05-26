'use client'

import * as React from 'react'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Wrapper do `next-themes` com defaults do projeto.
 *
 * - `attribute="class"` → setamos `class="dark"` no `<html>` (combina com
 *   `@custom-variant dark` no Tailwind v4)
 * - `defaultTheme="dark"` → dark-first
 * - `enableSystem` → respeita `prefers-color-scheme` na 1ª visita
 * - `disableTransitionOnChange` → evita flash de transição ao alternar
 *
 * O componente é client-only (`'use client'`) porque next-themes usa
 * `useEffect` para ler do localStorage. Para evitar flash de tema errado
 * na 1ª pintura, o pacote injeta um script inline no `<head>` que aplica
 * a classe antes do React hidratar.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
