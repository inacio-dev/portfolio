import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site'

/**
 * /robots.txt
 *
 * Portfólio é 100% público — libera tudo, só aponta o sitemap.
 *
 * Bloqueamos `/api/*` por convenção (não temos APIs hoje, mas reserva o
 * espaço se aparecer no futuro).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
