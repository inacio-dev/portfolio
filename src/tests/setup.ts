import '@testing-library/jest-dom'

// Tipos específicos para os valores de formulário
type FormValues = Record<string, string | number | boolean | string[]>

// Tipos específicos para estilos CSS
type CSSStyleValue = string | number
type CSSStyles = Record<string, CSSStyleValue>

// Extensão dos matchers do Jest com tipagem moderna e segura
declare module '@jest/expect' {
  interface Matchers<R> {
    toBeInTheDocument(): R
    toHaveAttribute(attribute: string, value?: string): R
    toHaveClass(className: string): R
    toHaveTextContent(text: string | RegExp): R
    toBeVisible(): R
    toBeDisabled(): R
    toBeEnabled(): R
    toHaveValue(value: string | number): R
    toBeChecked(): R
    toHaveFocus(): R
    toBeRequired(): R
    toBeValid(): R
    toBeInvalid(): R
    toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
    toHaveFormValues(values: FormValues): R
    toHaveStyle(style: string | CSSStyles): R
    toBeEmptyDOMElement(): R
    toContainElement(element: HTMLElement | null): R
    toContainHTML(htmlText: string): R
    toHaveAccessibleDescription(expectedAccessibleDescription?: string | RegExp): R
    toHaveAccessibleName(expectedAccessibleName?: string | RegExp): R
  }
}
