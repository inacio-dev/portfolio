/* eslint-disable @next/next/no-img-element */
import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'

import CircularImageCarousel from '@/components/CircularCarousel'

// Mock do Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} data-testid="carousel-image" />
  }
})

// Mock do Embla Carousel
jest.mock('embla-carousel-react', () => {
  return function useEmblaCarousel() {
    return [{ current: null }, null]
  }
})

// Mock do Autoplay plugin
jest.mock('embla-carousel-autoplay', () => {
  return function Autoplay() {
    return {}
  }
})

describe('CircularImageCarousel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar o carousel com estrutura básica', () => {
    render(<CircularImageCarousel />)

    // Verifica se pelo menos uma imagem é renderizada
    const images = screen.getAllByTestId('carousel-image')
    expect(images.length).toBeGreaterThan(0)
  })

  it('deve renderizar as primeiras 5 imagens esperadas', () => {
    render(<CircularImageCarousel />)

    const expectedFirstImages = ['next', 'vite', 'vue', 'astro', 'angular']

    expectedFirstImages.forEach((imageName, index) => {
      const image = screen.getByAltText(`Imagem ${index + 1}`)
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', `/carousel/${imageName}.png`)
    })
  })

  it('deve renderizar o número total correto de imagens', () => {
    render(<CircularImageCarousel />)

    const images = screen.getAllByTestId('carousel-image')
    expect(images).toHaveLength(18) // Total de imagens no array
  })

  it('deve aplicar classes responsivas no primeiro item', () => {
    const { container } = render(<CircularImageCarousel />)

    // Procura pela div que contém as classes responsivas
    const responsiveContainer = container.querySelector('.min-w-0')

    expect(responsiveContainer).toBeInTheDocument()
    expect(responsiveContainer).toHaveClass('min-w-0')
    expect(responsiveContainer).toHaveClass('flex-[0_0_50%]')
    expect(responsiveContainer).toHaveClass('px-4')
  })

  it('deve ter container principal com classes corretas', () => {
    const { container } = render(<CircularImageCarousel />)

    // Procura pela div principal com classes relative mt-4 w-full
    const mainContainer = container.querySelector('.relative.mt-4.w-full')

    expect(mainContainer).toBeInTheDocument()
    expect(mainContainer).toHaveClass('relative')
    expect(mainContainer).toHaveClass('mt-4')
    expect(mainContainer).toHaveClass('w-full')
  })

  it('deve renderizar gradientes de esfumado', () => {
    const { container } = render(<CircularImageCarousel />)

    const gradients = container.querySelectorAll('[class*="bg-gradient"]')
    expect(gradients).toHaveLength(2)
  })

  it('deve ter estrutura flex para o carousel', () => {
    const { container } = render(<CircularImageCarousel />)

    // Procura pela div com classe flex que contém as imagens
    const flexContainer = container.querySelector('.overflow-hidden .flex')

    expect(flexContainer).toBeInTheDocument()
    expect(flexContainer).toHaveClass('flex')
  })

  it('deve ter container com overflow hidden', () => {
    const { container } = render(<CircularImageCarousel />)

    // Procura pela div com overflow-hidden
    const overflowContainer = container.querySelector('.overflow-hidden')

    expect(overflowContainer).toBeInTheDocument()
    expect(overflowContainer).toHaveClass('overflow-hidden')
  })
})
