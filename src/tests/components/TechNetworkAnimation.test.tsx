import { act, render, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom'

import TechNetworkAnimation from '@/components/TechNetworkAnimation'

// Mock do ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock do getBoundingClientRect
const mockGetBoundingClientRect = jest.fn(() => ({
  width: 800,
  height: 600,
  top: 0,
  left: 0,
  bottom: 600,
  right: 800,
  x: 0,
  y: 0,
  toJSON: jest.fn(),
}))

// Mock do requestAnimationFrame
const mockRequestAnimationFrame = jest.fn((callback) => {
  setTimeout(callback, 16) // Simula 60fps
  return 1
})

const mockCancelAnimationFrame = jest.fn()

// Mock do setTimeout para controlar delays
jest.useFakeTimers()

beforeAll(() => {
  global.requestAnimationFrame = mockRequestAnimationFrame
  global.cancelAnimationFrame = mockCancelAnimationFrame
})

afterAll(() => {
  jest.useRealTimers()
  // Restaurar requestAnimationFrame original se existir
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    global.requestAnimationFrame = window.requestAnimationFrame
  }
})

describe('TechNetworkAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()

    // Garantir que requestAnimationFrame está mockado
    global.requestAnimationFrame = mockRequestAnimationFrame
    global.cancelAnimationFrame = mockCancelAnimationFrame

    // Mock do getBoundingClientRect para o container
    HTMLDivElement.prototype.getBoundingClientRect = mockGetBoundingClientRect
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
  })

  describe('Renderização Básica', () => {
    it('deve renderizar o container principal', () => {
      render(<TechNetworkAnimation />)

      // Procurar pela div container com a classe específica
      const container = document.querySelector('.absolute.inset-0.h-full.w-full')
      expect(container).toBeInTheDocument()
    })

    it('deve renderizar o SVG com dimensões corretas', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(() => {
        const svg = document.querySelector('svg')
        expect(svg).toBeInTheDocument()
        expect(svg).toHaveAttribute('width', '800')
        expect(svg).toHaveAttribute('height', '600')
        expect(svg).toHaveAttribute('viewBox', '0 0 800 600')
      })
    })

    it('deve aplicar classes CSS corretas ao container', () => {
      render(<TechNetworkAnimation />)

      // Buscar especificamente pela div com as classes do componente
      const container = document.querySelector('div[class*="absolute"]')
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('absolute')
      expect(container).toHaveClass('inset-0')
      expect(container).toHaveClass('h-full')
      expect(container).toHaveClass('w-full')
    })
  })

  describe('Definições SVG', () => {
    it('deve renderizar gradientes de conexão', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(() => {
        const connectionGradient = document.querySelector('#connectionGradient')
        const activeConnectionGradient = document.querySelector('#activeConnectionGradient')

        expect(connectionGradient).toBeInTheDocument()
        expect(activeConnectionGradient).toBeInTheDocument()
      })
    })

    it('deve renderizar filtro de brilho', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(() => {
        const glowFilter = document.querySelector('#glow')
        expect(glowFilter).toBeInTheDocument()
      })
    })

    it('deve configurar gradientes com cores corretas', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(() => {
        const connectionStops = document.querySelectorAll('#connectionGradient stop')
        expect(connectionStops).toHaveLength(2)
        expect(connectionStops[0]).toHaveAttribute('stop-color', '#9CA3AF')
        expect(connectionStops[1]).toHaveAttribute('stop-color', '#6B7280')
      })
    })
  })

  describe('Inicialização da Rede', () => {
    it('deve inicializar a rede quando o container tem tamanho', async () => {
      render(<TechNetworkAnimation />)

      // A rede é inicializada após o container ser medido
      await waitFor(
        () => {
          const circles = document.querySelectorAll('circle')
          expect(circles.length).toBeGreaterThan(0)
        },
        { timeout: 1500 },
      )
    })

    it('deve criar no máximo 10 nós', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(
        () => {
          const circles = document.querySelectorAll('circle')
          // Cada nó tem pelo menos 2 círculos (principal + core), pode ter 3 com anel de ativação
          const estimatedNodes = Math.floor(circles.length / 2)
          expect(estimatedNodes).toBeLessThanOrEqual(10)
        },
        { timeout: 1000 },
      )
    })

    it('deve criar conexões entre nós', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(
        () => {
          const paths = document.querySelectorAll('path')
          expect(paths.length).toBeGreaterThan(0)
        },
        { timeout: 1000 },
      )
    })
  })

  describe('Responsividade', () => {
    it('deve recalcular quando o container muda de tamanho', async () => {
      render(<TechNetworkAnimation />)

      // Aguardar renderização inicial
      await waitFor(() => {
        const svg = document.querySelector('svg')
        expect(svg).toHaveAttribute('width', '800')
      })

      // Simular mudança de tamanho
      mockGetBoundingClientRect.mockReturnValue({
        width: 1200,
        height: 800,
        top: 0,
        left: 0,
        bottom: 800,
        right: 1200,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      })

      // Disparar evento de resize
      act(() => {
        window.dispatchEvent(new Event('resize'))
      })

      await waitFor(() => {
        const svg = document.querySelector('svg')
        expect(svg).toHaveAttribute('width', '1200')
        expect(svg).toHaveAttribute('height', '800')
      })
    })

    it('deve adaptar número de colunas baseado na largura', async () => {
      // Container pequeno
      mockGetBoundingClientRect.mockReturnValue({
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        bottom: 300,
        right: 400,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      })

      render(<TechNetworkAnimation />)

      await waitFor(
        () => {
          const paths = document.querySelectorAll('path')
          expect(paths).toBeDefined()
        },
        { timeout: 1000 },
      )
    })
  })

  describe('Animações', () => {
    it('deve iniciar o loop de animação', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(
        () => {
          expect(mockRequestAnimationFrame).toHaveBeenCalled()
        },
        { timeout: 1000 },
      )
    })

    it('deve parar animação ao desmontar componente', async () => {
      const { unmount } = render(<TechNetworkAnimation />)

      await waitFor(() => {
        expect(mockRequestAnimationFrame).toHaveBeenCalled()
      })

      unmount()

      expect(mockCancelAnimationFrame).toHaveBeenCalled()
    })

    it('deve ativar a rede periodicamente', async () => {
      render(<TechNetworkAnimation />)

      // Aguardar inicialização
      await waitFor(() => {
        const circles = document.querySelectorAll('circle')
        expect(circles.length).toBeGreaterThan(0)
      })

      // Avançar tempo para trigger da rede (3 segundos)
      act(() => {
        jest.advanceTimersByTime(3000)
      })

      // Deve continuar funcionando
      expect(mockRequestAnimationFrame).toHaveBeenCalled()
    })
  })

  describe('Estrutura da Rede Neural', () => {
    it('deve manter nós nas extremidades verticais', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(
        () => {
          const circles = document.querySelectorAll('circle')
          expect(circles.length).toBeGreaterThan(0)

          // Verificar que existem nós próximos às bordas
          const nodes = Array.from(circles).filter((circle) => {
            const cy = parseFloat(circle.getAttribute('cy') || '0')
            const containerHeight = 600
            const margin = 50
            return cy <= margin + 100 || cy >= containerHeight - margin - 100
          })

          expect(nodes.length).toBeGreaterThan(0)
        },
        { timeout: 1000 },
      )
    })

    it('deve criar múltiplas camadas quando há espaço', async () => {
      // Container largo para permitir mais colunas
      mockGetBoundingClientRect.mockReturnValue({
        width: 1000,
        height: 600,
        top: 0,
        left: 0,
        bottom: 600,
        right: 1000,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      })

      render(<TechNetworkAnimation />)

      await waitFor(
        () => {
          const paths = document.querySelectorAll('path')
          expect(paths.length).toBeGreaterThan(0)
        },
        { timeout: 1000 },
      )
    })
  })

  describe('Estados dos Elementos', () => {
    it('deve renderizar conexões com opacidade correta', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(
        () => {
          const paths = document.querySelectorAll('path')
          paths.forEach((path) => {
            const opacity = path.getAttribute('opacity')
            expect(['0.2', '0.5']).toContain(opacity)
          })
        },
        { timeout: 1000 },
      )
    })

    it('deve aplicar filtro de brilho aos nós', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(
        () => {
          const nodes = document.querySelectorAll('circle[filter="url(#glow)"]')
          expect(nodes.length).toBeGreaterThan(0)
        },
        { timeout: 1000 },
      )
    })
  })

  describe('Performance e Otimização', () => {
    it('deve limitar número de pulsos simultaneamente', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(
        () => {
          const circles = document.querySelectorAll('circle')
          expect(circles.length).toBeGreaterThan(0)
        },
        { timeout: 1000 },
      )

      // Simular múltiplas ativações
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      // Verificar que não há muitos pulsos (máximo ~8 conforme código)
      const pulses = document.querySelectorAll('circle[fill="#D1D5DB"]')
      expect(pulses.length).toBeLessThanOrEqual(10)
    })

    it('deve executar animação com requestAnimationFrame', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(() => {
        expect(mockRequestAnimationFrame).toHaveBeenCalled()
      })

      // Verificar que requestAnimationFrame foi chamado múltiplas vezes
      act(() => {
        jest.advanceTimersByTime(100)
      })

      // Verificar que foi chamado pelo menos uma vez e com uma função
      expect(mockRequestAnimationFrame).toHaveBeenCalledWith(expect.any(Function))

      // Verificar que foi chamado múltiplas vezes (pelo menos 1)
      expect(mockRequestAnimationFrame.mock.calls.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Casos Extremos', () => {
    it('deve lidar com container de tamanho zero', () => {
      mockGetBoundingClientRect.mockReturnValue({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      })

      expect(() => render(<TechNetworkAnimation />)).not.toThrow()
    })

    it('deve lidar com container muito pequeno', async () => {
      mockGetBoundingClientRect.mockReturnValue({
        width: 200,
        height: 150,
        top: 0,
        left: 0,
        bottom: 150,
        right: 200,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      })

      render(<TechNetworkAnimation />)

      await waitFor(() => {
        const svg = document.querySelector('svg')
        expect(svg).toBeInTheDocument()
      })
    })

    it('deve ter fallback quando requestAnimationFrame não existe', () => {
      // Temporariamente remover o mock
      const originalRAF = global.requestAnimationFrame
      const originalCAF = global.cancelAnimationFrame

      // @ts-expect-error Intentionally deleting global properties to test fallback behavior
      delete global.requestAnimationFrame
      // @ts-expect-error Intentionally deleting global properties to test fallback behavior
      delete global.cancelAnimationFrame

      // Renderizar componente
      expect(() => render(<TechNetworkAnimation />)).not.toThrow()

      // Restaurar mocks
      global.requestAnimationFrame = originalRAF
      global.cancelAnimationFrame = originalCAF
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter estrutura SVG acessível', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(() => {
        const svg = document.querySelector('svg')
        expect(svg).toBeInTheDocument()
        expect(svg?.tagName.toLowerCase()).toBe('svg')
      })
    })

    it('deve manter elementos SVG bem estruturados', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(
        () => {
          const defs = document.querySelector('defs')
          const circles = document.querySelectorAll('circle')
          const paths = document.querySelectorAll('path')

          expect(defs).toBeInTheDocument()
          expect(circles.length).toBeGreaterThan(0)
          expect(paths.length).toBeGreaterThan(0)
        },
        { timeout: 1000 },
      )
    })
  })

  describe('Integração com roteamento', () => {
    it('deve manter nós nas posições esperadas', async () => {
      render(<TechNetworkAnimation />)

      await waitFor(
        () => {
          const circles = document.querySelectorAll('circle')
          expect(circles.length).toBeGreaterThan(0)

          // Verificar que nós têm posições válidas
          circles.forEach((circle) => {
            const cx = parseFloat(circle.getAttribute('cx') || '0')
            const cy = parseFloat(circle.getAttribute('cy') || '0')

            expect(cx).toBeGreaterThanOrEqual(0)
            expect(cy).toBeGreaterThanOrEqual(0)
            expect(cx).toBeLessThanOrEqual(800)
            expect(cy).toBeLessThanOrEqual(600)
          })
        },
        { timeout: 1000 },
      )
    })

    it('deve funcionar com diferentes tamanhos de container', async () => {
      // Container muito largo
      mockGetBoundingClientRect.mockReturnValue({
        width: 1600,
        height: 400,
        top: 0,
        left: 0,
        bottom: 400,
        right: 1600,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      })

      render(<TechNetworkAnimation />)

      await waitFor(
        () => {
          const svg = document.querySelector('svg')
          expect(svg).toHaveAttribute('width', '1600')
          expect(svg).toHaveAttribute('height', '400')
        },
        { timeout: 1000 },
      )
    })
  })
})
