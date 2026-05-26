import { redirect } from 'next/navigation'

/**
 * 404 raiz — captura URLs fora de qualquer locale (ex: `/foo` antes do
 * middleware ter chance, ou rotas inválidas que o proxy não cobre).
 *
 * Estratégia: redirecionar pro home. Como `pt-BR` é o default e roda
 * sem prefixo, `/` já cobre. O middleware faz a negociação do locale
 * com base no `Accept-Language` antes de servir a home.
 *
 * O cast `as Parameters<typeof redirect>[0]` é necessário porque com
 * `typedRoutes: true` e o segmento dinâmico `[locale]` o Next gera
 * tipos como `/pt-BR`, `/en`, `/es` — `/` não aparece literalmente.
 * Em runtime o middleware resolve normalmente.
 */
export default function RootNotFound(): never {
  redirect('/' as Parameters<typeof redirect>[0])
}
