/**
 * Catálogo de projetos exibidos na home e na página /projetos.
 *
 * Mantenha as keys (`teleoperacao`, `beq`, ...) em sincronia com
 * `messages/{locale}.json` → `Projects.items.<key>` para que título e
 * descrição venham do JSON traduzido.
 *
 * `featured: true` aparece em destaque na home; o resto só na listagem
 * completa.
 */

export type ProjectKey = 'teleoperacao' | 'beq' | 'neuroarq' | 'portfolio'

export interface ProjectMeta {
  key: ProjectKey
  /** Tecnologias usadas — mostrado como Badge no card */
  stack: readonly string[]
  /** URL pública do código fonte (vazio = privado) */
  repoUrl?: string
  /** URL pública de demo/site (vazio = sem demo) */
  liveUrl?: string
  /** Destaque na home */
  featured: boolean
  /** Imagem de capa em /public — pode ser substituída pelo usuário */
  cover?: string
}

export const PROJECTS: readonly ProjectMeta[] = [
  {
    key: 'teleoperacao',
    stack: ['Python', 'C++', 'Raspberry Pi', 'ESP32', 'UDP', 'WebRTC', 'Three.js'],
    repoUrl: 'https://github.com/inacio-dev/monografia',
    featured: true,
    cover: '/projects/teleoperacao.svg',
  },
  {
    key: 'beq',
    stack: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Kubernetes', 'DevOps'],
    liveUrl: 'https://beq.com.br/',
    featured: true,
  },
  {
    key: 'neuroarq',
    stack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Stripe'],
    liveUrl: 'https://www.neuroarqtools.com/br/login',
    featured: true,
  },
  {
    key: 'portfolio',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'next-intl', 'Server Actions'],
    repoUrl: 'https://github.com/inacio-dev/portfolio',
    liveUrl: 'https://inaciorodrigues.dev.br',
    featured: true,
  },
] as const
