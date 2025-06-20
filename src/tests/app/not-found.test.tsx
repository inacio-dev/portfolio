import { JSX } from 'react'
import { render, screen } from '@testing-library/react'

import NotFound from '@/app/[locale]/not-found'

// Mock do Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

// Helper para renderizar componente assíncrono
const renderAsync = async (component: Promise<JSX.Element>) => {
  const resolvedComponent = await component
  return render(resolvedComponent)
}

describe('NotFound Page', () => {
  it('renders the not found heading', async () => {
    await renderAsync(NotFound())

    const heading = screen.getByRole('heading', { name: /not found/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the error message', async () => {
    await renderAsync(NotFound())

    const errorMessage = screen.getByText(/could not find requested resource/i)
    expect(errorMessage).toBeInTheDocument()
  })

  it('renders the return home link', async () => {
    await renderAsync(NotFound())

    const homeLink = screen.getByRole('link', { name: /return home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('has the correct structure', async () => {
    await renderAsync(NotFound())

    const container = screen.getByRole('heading', { name: /not found/i }).parentElement
    expect(container).toBeInTheDocument()

    // Verifica se todos os elementos estão presentes na ordem correta
    expect(screen.getByRole('heading', { name: /not found/i })).toBeInTheDocument()
    expect(screen.getByText(/could not find requested resource/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /return home/i })).toBeInTheDocument()
  })
})
