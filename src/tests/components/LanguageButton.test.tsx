/* eslint-disable @typescript-eslint/no-explicit-any */

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

// Mock do Material-UI
jest.mock('@mui/material', () => ({
  Menu: ({ children, open, onClose }: any) =>
    open ? (
      <div data-testid="language-menu" onClick={onClose}>
        {children}
      </div>
    ) : null,
  MenuItem: ({ children, onClick, selected }: any) => (
    <div data-testid="menu-item" onClick={onClick} data-selected={selected} role="menuitem">
      {children}
    </div>
  ),
}))

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
const mockUseLocale = useLocale as jest.MockedFunction<typeof useLocale>

const mockPush = jest.fn()
const mockRouter = { push: mockPush }

describe('LanguageButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePathname.mockReturnValue('/')
    mockUseRouter.mockReturnValue(mockRouter as any)
    mockUseLocale.mockReturnValue('pt')
  })

  it('deve renderizar o botão com o locale atual', () => {
    render(<LanguageButton />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('PT')
  })

  it('deve aplicar as classes CSS corretas ao botão', () => {
    render(<LanguageButton />)

    const button = screen.getByRole('button')
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

  it('deve abrir o menu quando o botão for clicado', () => {
    render(<LanguageButton />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByTestId('language-menu')).toBeInTheDocument()
  })

  it('deve exibir todos os locales disponíveis no menu', () => {
    render(<LanguageButton />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    const menuItems = screen.getAllByTestId('menu-item')
    expect(menuItems).toHaveLength(4) // pt, en, es, zh

    expect(menuItems[0]).toHaveTextContent('PT')
    expect(menuItems[1]).toHaveTextContent('EN')
    expect(menuItems[2]).toHaveTextContent('ES')
    expect(menuItems[3]).toHaveTextContent('ZH')
  })

  it('deve marcar o locale atual como selecionado', () => {
    mockUseLocale.mockReturnValue('en')

    render(<LanguageButton />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    const menuItems = screen.getAllByTestId('menu-item')

    // Primeiro item (PT) não deve estar selecionado
    expect(menuItems[0]).toHaveAttribute('data-selected', 'false')
    // Segundo item (EN) deve estar selecionado
    expect(menuItems[1]).toHaveAttribute('data-selected', 'true')
  })

  it('deve chamar router.push quando um locale for selecionado', async () => {
    render(<LanguageButton />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    const menuItems = screen.getAllByTestId('menu-item')
    fireEvent.click(menuItems[1]) // Clica em EN

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/', { locale: 'en' })
    })
  })

  it('deve fechar o menu após selecionar um locale', async () => {
    render(<LanguageButton />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByTestId('language-menu')).toBeInTheDocument()

    const menuItems = screen.getAllByTestId('menu-item')
    fireEvent.click(menuItems[1])

    await waitFor(() => {
      expect(screen.queryByTestId('language-menu')).not.toBeInTheDocument()
    })
  })

  it('deve fechar o menu quando clicar fora dele', () => {
    render(<LanguageButton />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByTestId('language-menu')).toBeInTheDocument()

    // Simula clique fora do menu
    const menu = screen.getByTestId('language-menu')
    fireEvent.click(menu)

    expect(screen.queryByTestId('language-menu')).not.toBeInTheDocument()
  })

  it('deve exibir o locale atual no botão dinamicamente', () => {
    const { rerender } = render(<LanguageButton />)

    // Inicialmente PT
    expect(screen.getByRole('button')).toHaveTextContent('PT')

    // Muda para EN
    mockUseLocale.mockReturnValue('en')

    act(() => {
      rerender(<LanguageButton />)
    })

    expect(screen.getByRole('button')).toHaveTextContent('EN')
  })

  it('deve lidar com locales não reconhecidos graciosamente', () => {
    mockUseLocale.mockReturnValue('unknown' as any)

    render(<LanguageButton />)

    expect(screen.getByRole('button')).toHaveTextContent('UNKNOWN')
  })

  describe('Acessibilidade', () => {
    it('deve ter um botão acessível', () => {
      render(<LanguageButton />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('deve ter itens de menu com role correto', () => {
      render(<LanguageButton />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      const menuItems = screen.getAllByRole('menuitem')
      expect(menuItems).toHaveLength(4)
    })
  })

  describe('Interações do menu', () => {
    it('deve manter o menu fechado inicialmente', () => {
      render(<LanguageButton />)

      expect(screen.queryByTestId('language-menu')).not.toBeInTheDocument()
    })

    it('deve permitir navegar entre diferentes locales', async () => {
      render(<LanguageButton />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      const menuItems = screen.getAllByTestId('menu-item')

      // Testa clique em diferentes locales
      fireEvent.click(menuItems[2]) // ES

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/', { locale: 'es' })
      })
    })

    it('deve exibir o texto correto para cada locale', () => {
      render(<LanguageButton />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      const menuItems = screen.getAllByTestId('menu-item')

      expect(menuItems[0]).toHaveTextContent('PT')
      expect(menuItems[1]).toHaveTextContent('EN')
      expect(menuItems[2]).toHaveTextContent('ES')
      expect(menuItems[3]).toHaveTextContent('ZH')
    })
  })

  describe('Estados do componente', () => {
    it('deve mostrar estado correto para locale zh', () => {
      mockUseLocale.mockReturnValue('zh')

      render(<LanguageButton />)

      expect(screen.getByRole('button')).toHaveTextContent('ZH')
    })

    it('deve mostrar estado correto para locale es', () => {
      mockUseLocale.mockReturnValue('es')

      render(<LanguageButton />)

      expect(screen.getByRole('button')).toHaveTextContent('ES')
    })

    it('deve manter consistência entre o botão e menu selecionado', () => {
      mockUseLocale.mockReturnValue('zh')

      render(<LanguageButton />)

      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('ZH')

      fireEvent.click(button)

      const menuItems = screen.getAllByTestId('menu-item')
      expect(menuItems[3]).toHaveAttribute('data-selected', 'true') // zh é o 4º item
    })
  })
})
