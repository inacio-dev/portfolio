import createMiddleware from 'next-intl/middleware'

import { locales, pathnames } from './navigation'

export default createMiddleware({
  defaultLocale: 'pt',
  locales,
  pathnames,
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
