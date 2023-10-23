import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://inacio-rodrigues.vercel.app'

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/records?view=ongoing`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/historico?view=ongoing`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/records?view=resume`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/historico?view=resume`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projetos`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      priority: 0.2,
    },
    {
      url: `${baseUrl}/termos`,
      lastModified: new Date(),
      priority: 0.2,
    },
  ]
}
