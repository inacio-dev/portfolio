/**
 * Catálogo de certificados — espelha os PDFs em `docs/certificados/`.
 *
 * Os PDFs ficam em `docs/` (fora de /public) propositalmente: o usuário
 * baixa via copy explícita para `/public/certificados/<slug>.pdf` no build,
 * ou via server action que serve o arquivo. Por simplicidade, este array
 * já lista os PDFs nominalmente — se quiser servir os arquivos, copiar
 * para /public/certificados/ no deploy e o `file` aponta pra lá.
 *
 * Para adicionar novo certificado:
 * 1. Coloque o PDF em `public/certificados/<slug>.pdf`
 * 2. Adicione uma entrada aqui com slug, título, ano, emissor
 */

export type CertificateCategory = 'tech' | 'language' | 'business' | 'academic' | 'event'

export interface Certificate {
  slug: string
  /** Nome curto exibido no card */
  title: string
  /** Instituição emissora */
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
    title: "CS50's Web Programming with Python and JavaScript",
    issuer: 'HarvardX — Harvard University',
    year: '2022',
    category: 'tech',
    file: '/certificados/cs50-harvard.pdf',
  },
  {
    slug: 'eldorado-cloud-swift-iot',
    title: 'Práticas de Cloud Services usando Swift com ênfase em IoT',
    issuer: 'Instituto Eldorado (IBM/Apple)',
    year: '2019',
    category: 'tech',
    file: '/certificados/eldorado-cloud-swift-iot.pdf',
  },
  {
    slug: 'eldorado-logica-swift-js',
    title: 'Lógica de Programação, Swift, JavaScript e RESTful API',
    issuer: 'Instituto Eldorado (IBM/Apple)',
    year: '2019',
    category: 'tech',
    file: '/certificados/eldorado-logica-swift-js.pdf',
  },
  {
    slug: 'ebac-react',
    title: 'Primeiros passos com React',
    issuer: 'EBAC',
    year: '2024',
    category: 'tech',
    file: '/certificados/ebac-react.pdf',
  },
  {
    slug: 'rocketseat-discover',
    title: 'Conectar do Discover',
    issuer: 'Rocketseat',
    year: '2023',
    category: 'tech',
    file: '/certificados/rocketseat-discover.pdf',
  },
  {
    slug: 'santander-python',
    title: 'Backend com Python',
    issuer: 'Santander Open Academy',
    year: '2025',
    category: 'tech',
    file: '/certificados/santander-python.pdf',
  },

  // Business / gestão
  {
    slug: 'scrum-foundation',
    title: 'Scrum Foundation Professional Certificate (SFPC)',
    issuer: 'CertiProf',
    year: '2022',
    category: 'business',
    file: '/certificados/scrum-foundation.pdf',
  },
  {
    slug: 'certificacao-executiva-negocios',
    title: 'Certificação Executiva — Desenvolvimento de Negócios',
    issuer: 'Conquer',
    year: '2024',
    category: 'business',
    file: '/certificados/certificacao-executiva-negocios.pdf',
  },
  {
    slug: 'digital-marketing-professional',
    title: 'Digital Marketing Professional Certificate (DMPC)',
    issuer: 'CertiProf',
    year: '2022',
    category: 'business',
    file: '/certificados/digital-marketing-professional.pdf',
  },
  {
    slug: 'google-ads-imersao',
    title: 'Imersão Google Ads — Search, Display e Vídeo',
    issuer: 'Escola Brasileira de Marketing Digital',
    year: '2022',
    category: 'business',
    file: '/certificados/google-ads-imersao.pdf',
  },

  // Idiomas
  {
    slug: 'cultura-inglesa-b1',
    title: 'Inglês Avançado — CEFR B1',
    issuer: 'Cultura Inglesa',
    year: '2020',
    category: 'language',
    file: '/certificados/cultura-inglesa-b1.pdf',
  },
  {
    slug: 'cultura-inglesa-a2',
    title: 'Inglês Intermediário — CEFR A2',
    issuer: 'Cultura Inglesa',
    year: '2019',
    category: 'language',
    file: '/certificados/cultura-inglesa-a2.pdf',
  },

  // Acadêmico
  {
    slug: 'declaracao-prex',
    title: 'Declaração PREX — Programa de Extensão Universitária',
    issuer: 'UFC',
    year: '2022',
    category: 'academic',
    file: '/certificados/declaracao-prex.pdf',
  },
  {
    slug: 'estrutura-curricular-ufc',
    title: 'Estrutura Curricular — Engenharia de Computação',
    issuer: 'UFC',
    year: '2026',
    category: 'academic',
    file: '/certificados/estrutura-curricular-ufc.pdf',
  },
  {
    slug: 'historico-ensino-medio',
    title: 'Conclusão e Histórico do Ensino Médio',
    issuer: 'Colégio Lourenço Filho',
    year: '2018',
    category: 'academic',
    file: '/certificados/historico-ensino-medio.pdf',
  },

  // Eventos / palestras
  {
    slug: 'hackpi-2021',
    title: 'HackPI Ceará — Hackathon para a Primeira Infância',
    issuer: 'Governo do Estado do Ceará',
    year: '2021',
    category: 'event',
    file: '/certificados/hackpi-2021.pdf',
  },
  {
    slug: 'setic-autenticacao-redes',
    title: 'Minicurso: Autenticação em Redes',
    issuer: 'SETIC — UFC',
    year: '2020',
    category: 'event',
    file: '/certificados/setic-autenticacao-redes.pdf',
  },
  {
    slug: 'setic-redes-neurais-tensorflow',
    title: 'Minicurso: Redes Neurais Convolucionais com TensorFlow',
    issuer: 'SETIC — UFC',
    year: '2020',
    category: 'event',
    file: '/certificados/setic-redes-neurais-tensorflow.pdf',
  },
  {
    slug: 'semm-energia-solar',
    title: 'Palestra: Energia Solar Fotovoltaica',
    issuer: 'SEMM',
    year: '2020',
    category: 'event',
    file: '/certificados/semm-energia-solar.pdf',
  },
  {
    slug: 'semm-nanotecnologia',
    title: 'Palestra: Nanotecnologia como Ciência Fundamental',
    issuer: 'SEMM',
    year: '2020',
    category: 'event',
    file: '/certificados/semm-nanotecnologia.pdf',
  },
  {
    slug: 'letrare-paula-ianelli',
    title: 'Bate-papo com Paula Ianelli',
    issuer: 'Letrare 2021',
    year: '2021',
    category: 'event',
    file: '/certificados/letrare-paula-ianelli.pdf',
  },
  {
    slug: 'gracom-open-cg',
    title: 'Open CG — Computação Gráfica',
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
