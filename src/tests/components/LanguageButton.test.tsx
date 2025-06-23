/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { usePathname, useRouter } from '@/i18n/navigation'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useLocale } from 'next-intl'

import LanguageButton from '@/components/LanguageButton'

// Mock dos hooks
jest.mock('../../i18n/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}))

jest.mock('../../i18n/routing', () => ({
  routing: {
    locales: ['pt', 'en', 'es', 'zh'],
  },
}))

jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
}))

// Mock do clsx
jest.mock('clsx', () => ({
  __esModule: true,
  default: (...classes: (string | object | boolean | undefined)[]) =>
    classes.filter(Boolean).join(' '),
}))

// Mock da Headless UI
jest.mock('@headlessui/react', () => ({
  Menu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="headless-menu">{children}</div>
  ),
  MenuButton: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode
    className?: string
    onClick?: () => void
  }) => (
    <button className={className} data-testid="menu-button" {...props}>
      {children}
    </button>
  ),
  MenuItems: ({
    children,
    className,
    transition,
    ...restProps
  }: {
    children: React.ReactNode
    className?: string
    transition?: boolean
    [key: string]: unknown
  }) => {
    // Filtra apenas as props que são válidas para elementos HTML
    const validProps = Object.fromEntries(
      Object.entries(restProps).filter(([key]) => !['anchor', 'portal', 'modal'].includes(key)),
    )

    return (
      <div className={className} data-testid="menu-items" {...validProps}>
        {children}
      </div>
    )
  },
  MenuItem: ({
    children,
    ...props
  }: {
    children: ({ focus }: { focus: boolean }) => React.ReactNode
  }) => (
    <div data-testid="menu-item" {...props}>
      {typeof children === 'function' ? children({ focus: false }) : children}
    </div>
  ),
}))

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
const mockUseLocale = useLocale as jest.MockedFunction<typeof useLocale>

const mockPush = jest.fn()
const mockReplace = jest.fn()
const mockPrefetch = jest.fn()
const mockBack = jest.fn()
const mockForward = jest.fn()
const mockRefresh = jest.fn()

const mockRouter = {
  push: mockPush,
  replace: mockReplace,
  prefetch: mockPrefetch,
  back: mockBack,
  forward: mockForward,
  refresh: mockRefresh,
}

describe('LanguageButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePathname.mockReturnValue('/')
    mockUseRouter.mockReturnValue(mockRouter)
    mockUseLocale.mockReturnValue('pt')
  })

  it('deve renderizar o botão com o locale atual', () => {
    render(<LanguageButton />)

    const button = screen.getByTestId('menu-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('PT')
  })

  it('deve aplicar as classes CSS corretas ao botão', () => {
    render(<LanguageButton />)

    const button = screen.getByTestId('menu-button')
    expect(button).toHaveClass(
      'flex',
      'size-10',
      'cursor-pointer',
      'items-center',
      'justify-center',
      'rounded-full',
      'bg-white',
      'transition-all',
      'duration-300',
      'hover:bg-white/60',
    )
  })

  it('deve renderizar o componente Menu da Headless UI', () => {
    render(<LanguageButton />)

    expect(screen.getByTestId('headless-menu')).toBeInTheDocument()
    expect(screen.getByTestId('menu-button')).toBeInTheDocument()
    expect(screen.getByTestId('menu-items')).toBeInTheDocument()
  })

  it('deve exibir todos os locales disponíveis no menu', () => {
    render(<LanguageButton />)

    const menuItems = screen.getAllByTestId('menu-item')
    expect(menuItems).toHaveLength(4) // pt, en, es, zh
  })

  it('deve chamar router.push quando um locale for selecionado', async () => {
    render(<LanguageButton />)

    const menuItems = screen.getAllByTestId('menu-item')
    const firstMenuItem = menuItems[0]

    // Encontra o botão dentro do MenuItem
    const button = firstMenuItem.querySelector('button')
    expect(button).toBeInTheDocument()

    if (button) {
      fireEvent.click(button)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/', { locale: 'pt' })
      })
    }
  })

  it('deve exibir o locale atual no botão dinamicamente', () => {
    const { rerender } = render(<LanguageButton />)

    // Inicialmente PT
    expect(screen.getByTestId('menu-button')).toHaveTextContent('PT')

    // Muda para EN
    mockUseLocale.mockReturnValue('en')

    act(() => {
      rerender(<LanguageButton />)
    })

    expect(screen.getByTestId('menu-button')).toHaveTextContent('EN')
  })

  it('deve lidar com locales não reconhecidos graciosamente', () => {
    mockUseLocale.mockReturnValue('unknown' as 'pt')

    render(<LanguageButton />)

    expect(screen.getByTestId('menu-button')).toHaveTextContent('UNKNOWN')
  })

  describe('Acessibilidade', () => {
    it('deve ter um botão acessível', () => {
      render(<LanguageButton />)

      const button = screen.getByTestId('menu-button')
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('deve renderizar a estrutura correta do menu', () => {
      render(<LanguageButton />)

      expect(screen.getByTestId('headless-menu')).toBeInTheDocument()
      expect(screen.getByTestId('menu-button')).toBeInTheDocument()
      expect(screen.getByTestId('menu-items')).toBeInTheDocument()
    })
  })

  describe('Estados do componente', () => {
    it('deve mostrar estado correto para locale zh', () => {
      mockUseLocale.mockReturnValue('zh')

      render(<LanguageButton />)

      expect(screen.getByTestId('menu-button')).toHaveTextContent('ZH')
    })

    it('deve mostrar estado correto para locale es', () => {
      mockUseLocale.mockReturnValue('es')

      render(<LanguageButton />)

      expect(screen.getByTestId('menu-button')).toHaveTextContent('ES')
    })

    it('deve mostrar estado correto para locale en', () => {
      mockUseLocale.mockReturnValue('en')

      render(<LanguageButton />)

      expect(screen.getByTestId('menu-button')).toHaveTextContent('EN')
    })
  })

  describe('Funcionalidade do menu', () => {
    it('deve permitir navegar entre diferentes locales', async () => {
      render(<LanguageButton />)

      const menuItems = screen.getAllByTestId('menu-item')

      // Testa cada locale
      const locales = ['pt', 'en', 'es', 'zh']

      for (let i = 0; i < locales.length; i++) {
        const button = menuItems[i].querySelector('button')
        if (button) {
          fireEvent.click(button)

          await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/', { locale: locales[i] })
          })
        }
      }
    })

    it('deve exibir o texto correto para cada locale', () => {
      render(<LanguageButton />)

      const menuItems = screen.getAllByTestId('menu-item')
      const expectedTexts = ['PT', 'EN', 'ES', 'ZH']

      menuItems.forEach((item, index) => {
        expect(item).toHaveTextContent(expectedTexts[index])
      })
    })

    it('deve aplicar a classe correta para o locale selecionado', () => {
      mockUseLocale.mockReturnValue('en')
      render(<LanguageButton />)

      const menuItems = screen.getAllByTestId('menu-item')

      // Verifica se o segundo item (EN) tem a classe de selecionado
      const enButton = menuItems[1].querySelector('button')
      expect(enButton).toHaveClass('bg-black/20')

      // Verifica se os outros não têm a classe
      const ptButton = menuItems[0].querySelector('button')
      expect(ptButton).not.toHaveClass('bg-black/20')
    })
  })

  describe('Integração com roteamento', () => {
    it('deve usar o pathname atual ao navegar', async () => {
      mockUsePathname.mockReturnValue('/portfolio')

      render(<LanguageButton />)

      const menuItems = screen.getAllByTestId('menu-item')
      const button = menuItems[1].querySelector('button') // EN

      if (button) {
        fireEvent.click(button)

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith('/portfolio', { locale: 'en' })
        })
      }
    })

    it('deve funcionar com diferentes pathnames', async () => {
      mockUsePathname.mockReturnValue('/contact')

      render(<LanguageButton />)

      const menuItems = screen.getAllByTestId('menu-item')
      const button = menuItems[2].querySelector('button') // ES

      if (button) {
        fireEvent.click(button)

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith('/contact', { locale: 'es' })
        })
      }
    })
  })
})
