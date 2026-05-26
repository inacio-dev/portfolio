/**
 * Catálogo de certificados — espelha os PDFs em `docs/certificados/`.
 *
 * O **título** vive em `messages/{locale}.json` → `Certifications.items.<slug>`
 * para que possa ser traduzido (alguns títulos são em inglês oficial e
 * preservados; outros têm versões em pt-BR/en/es).
 *
 * **Issuer** fica aqui no catálogo — nome de instituição é marca registrada,
 * não se traduz (Harvard, CertiProf, UFC, etc.).
 *
 * Para adicionar novo certificado:
 * 1. PDF em `public/certificados/<slug>.pdf`
 * 2. Entrada aqui com `slug`, `issuer`, `year`, `category`, `file`
 * 3. Tradução do título nas 3 chaves `Certifications.items.<slug>`
 */

export type CertificateCategory = 'tech' | 'language' | 'business' | 'academic' | 'event'

export interface Certificate {
  /** Slug único — usado como key no JSON de tradução e para tracking */
  slug: string
  /** Instituição emissora — não se traduz (nome de marca) */
  issuer: string
  /** Ano de conclusão (string para flexibilidade — "2025", "Mar/2022", etc) */
  year: string
  category: CertificateCategory
  /** Caminho relativo dentro de /public — ou URL absoluta de emissor oficial */
  file: string
}

export const CERTIFICATIONS: readonly Certificate[] = [
  // Tech / programação
  {
    slug: 'cs50-harvard',
    issuer: 'HarvardX — Harvard University',
    year: '2022',
    category: 'tech',
    file: '/certificados/cs50-harvard.pdf',
  },
  {
    slug: 'eldorado-cloud-swift-iot',
    issuer: 'Instituto Eldorado (IBM/Apple)',
    year: '2019',
    category: 'tech',
    file: '/certificados/eldorado-cloud-swift-iot.pdf',
  },
  {
    slug: 'eldorado-logica-swift-js',
    issuer: 'Instituto Eldorado (IBM/Apple)',
    year: '2019',
    category: 'tech',
    file: '/certificados/eldorado-logica-swift-js.pdf',
  },
  {
    slug: 'ebac-react',
    issuer: 'EBAC',
    year: '2024',
    category: 'tech',
    file: '/certificados/ebac-react.pdf',
  },
  {
    slug: 'rocketseat-discover',
    issuer: 'Rocketseat',
    year: '2023',
    category: 'tech',
    file: '/certificados/rocketseat-discover.pdf',
  },
  {
    slug: 'santander-python',
    issuer: 'Santander Open Academy',
    year: '2025',
    category: 'tech',
    file: '/certificados/santander-python.pdf',
  },

  // Business / gestão
  {
    slug: 'scrum-foundation',
    issuer: 'CertiProf',
    year: '2022',
    category: 'business',
    file: '/certificados/scrum-foundation.pdf',
  },
  {
    slug: 'certificacao-executiva-negocios',
    issuer: 'Conquer',
    year: '2024',
    category: 'business',
    file: '/certificados/certificacao-executiva-negocios.pdf',
  },
  {
    slug: 'digital-marketing-professional',
    issuer: 'CertiProf',
    year: '2022',
    category: 'business',
    file: '/certificados/digital-marketing-professional.pdf',
  },
  {
    slug: 'google-ads-imersao',
    issuer: 'Escola Brasileira de Marketing Digital',
    year: '2022',
    category: 'business',
    file: '/certificados/google-ads-imersao.pdf',
  },

  // Idiomas
  {
    slug: 'cultura-inglesa-b1',
    issuer: 'Cultura Inglesa',
    year: '2020',
    category: 'language',
    file: '/certificados/cultura-inglesa-b1.pdf',
  },
  {
    slug: 'cultura-inglesa-a2',
    issuer: 'Cultura Inglesa',
    year: '2019',
    category: 'language',
    file: '/certificados/cultura-inglesa-a2.pdf',
  },

  // Acadêmico
  {
    slug: 'declaracao-prex',
    issuer: 'UFC',
    year: '2022',
    category: 'academic',
    file: '/certificados/declaracao-prex.pdf',
  },
  {
    slug: 'estrutura-curricular-ufc',
    issuer: 'UFC',
    year: '2026',
    category: 'academic',
    file: '/certificados/estrutura-curricular-ufc.pdf',
  },
  {
    slug: 'historico-ensino-medio',
    issuer: 'Colégio Lourenço Filho',
    year: '2018',
    category: 'academic',
    file: '/certificados/historico-ensino-medio.pdf',
  },

  // Eventos / palestras
  {
    slug: 'hackpi-2021',
    issuer: 'Governo do Estado do Ceará',
    year: '2021',
    category: 'event',
    file: '/certificados/hackpi-2021.pdf',
  },
  {
    slug: 'setic-autenticacao-redes',
    issuer: 'SETIC — UFC',
    year: '2020',
    category: 'event',
    file: '/certificados/setic-autenticacao-redes.pdf',
  },
  {
    slug: 'setic-redes-neurais-tensorflow',
    issuer: 'SETIC — UFC',
    year: '2020',
    category: 'event',
    file: '/certificados/setic-redes-neurais-tensorflow.pdf',
  },
  {
    slug: 'semm-energia-solar',
    issuer: 'SEMM',
    year: '2020',
    category: 'event',
    file: '/certificados/semm-energia-solar.pdf',
  },
  {
    slug: 'semm-nanotecnologia',
    issuer: 'SEMM',
    year: '2020',
    category: 'event',
    file: '/certificados/semm-nanotecnologia.pdf',
  },
  {
    slug: 'letrare-paula-ianelli',
    issuer: 'Letrare 2021',
    year: '2021',
    category: 'event',
    file: '/certificados/letrare-paula-ianelli.pdf',
  },
  {
    slug: 'gracom-open-cg',
    issuer: 'Gracom (Adobe)',
    year: '2018',
    category: 'event',
    file: '/certificados/gracom-open-cg.pdf',
  },
] as const

/** Anos únicos ordenados desc — útil para filtros futuros. */
export const CERTIFICATION_YEARS = Array.from(new Set(CERTIFICATIONS.map((c) => c.year))).sort(
  (a, b) => b.localeCompare(a),
)
