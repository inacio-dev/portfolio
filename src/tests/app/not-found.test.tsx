import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'

import NotFound from '@/app/not-found'

// Mock do Next.js Link component
jest.mock('next/link', () => {
  return function MockedLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

describe('NotFound', () => {
  it('should render the not found heading', () => {
    render(<NotFound />)

    const heading = screen.getByRole('heading', { name: /not found/i })
    expect(heading).toBeInTheDocument()
  })

  it('should render the error message', () => {
    render(<NotFound />)

    const message = screen.getByText(/could not find requested resource/i)
    expect(message).toBeInTheDocument()
  })

  it('should render a link to return home', () => {
    render(<NotFound />)

    const homeLink = screen.getByRole('link', { name: /return home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('should have correct structure', () => {
    render(<NotFound />)

    const container = screen.getByRole('heading').parentElement
    expect(container).toBeInTheDocument()

    // Verifica se contém todos os elementos filhos esperados
    expect(container).toContainElement(screen.getByRole('heading', { name: /not found/i }))
    expect(container).toContainElement(screen.getByText(/could not find requested resource/i))
    expect(container).toContainElement(screen.getByRole('link', { name: /return home/i }))
  })
})
