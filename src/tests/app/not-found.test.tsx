import { JSX } from 'react'
import { render, screen } from '@testing-library/react'

import NotFound from '@/app/[locale]/not-found'

// Mock do next-intl
jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(() =>
    Promise.resolve((key: string) => {
      const translations = {
        title: 'Página não encontrada',
        description: 'Não foi possível encontrar o recurso solicitado',
        returnHome: 'Voltar ao início',
      }
      return translations[key as keyof typeof translations] || key
    }),
  ),
}))

// Mock do Link da navegação internacionalizada
jest.mock('../../i18n/navigation', () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode
    href: string
    className?: string
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

// Helper para renderizar componente assíncrono
const renderAsync = async (component: Promise<JSX.Element>) => {
  const resolvedComponent = await component
  return render(resolvedComponent)
}

describe('NotFound Page', () => {
  it('renders the not found heading with translation', async () => {
    await renderAsync(NotFound())

    const heading = screen.getByRole('heading', { name: /página não encontrada/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the error message with translation', async () => {
    await renderAsync(NotFound())

    const errorMessage = screen.getByText(/não foi possível encontrar o recurso solicitado/i)
    expect(errorMessage).toBeInTheDocument()
  })

  it('renders the return home link with translation', async () => {
    await renderAsync(NotFound())

    const homeLink = screen.getByRole('link', { name: /voltar ao início/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('applies correct CSS classes to the container', async () => {
    await renderAsync(NotFound())

    const container = screen.getByRole('heading', { name: /página não encontrada/i }).parentElement
    expect(container).toHaveClass(
      'flex',
      'h-[calc(100svh-64px-32px)]',
      'flex-col',
      'items-center',
      'justify-center',
      'text-center',
      'lg:h-[calc(100vh-80px-32px)]',
    )
  })

  it('applies correct CSS classes to the link', async () => {
    await renderAsync(NotFound())

    const homeLink = screen.getByRole('link', { name: /voltar ao início/i })
    expect(homeLink).toHaveClass(
      'text-blue-500',
      'transition-all',
      'duration-300',
      'hover:text-blue-700',
    )
  })

  it('has the correct structure with translations', async () => {
    await renderAsync(NotFound())

    const container = screen.getByRole('heading', { name: /página não encontrada/i }).parentElement
    expect(container).toBeInTheDocument()

    // Verifica se todos os elementos estão presentes na ordem correta
    expect(screen.getByRole('heading', { name: /página não encontrada/i })).toBeInTheDocument()
    expect(screen.getByText(/não foi possível encontrar o recurso solicitado/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /voltar ao início/i })).toBeInTheDocument()
  })

  it('uses the correct translation namespace', async () => {
    const nextIntlServer = await import('next-intl/server')

    await renderAsync(NotFound())

    expect(nextIntlServer.getTranslations).toHaveBeenCalledWith('NotFound')
  })

  it('has proper semantic structure', async () => {
    await renderAsync(NotFound())

    // Verifica se o título é um h2
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Página não encontrada')

    // Verifica se a descrição é um parágrafo
    const description = screen.getByText(/não foi possível encontrar o recurso solicitado/i)
    expect(description.tagName).toBe('P')

    // Verifica se o link está correto
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders content in correct order', async () => {
    await renderAsync(NotFound())

    const container = screen.getByRole('heading').parentElement
    const children = Array.from(container?.children || [])

    expect(children).toHaveLength(3)
    expect(children[0].tagName).toBe('H2')
    expect(children[1].tagName).toBe('P')
    expect(children[2].tagName).toBe('A')
  })
})
