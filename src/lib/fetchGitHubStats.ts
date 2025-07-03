'use server'

export interface GitHubStats {
  commits: string
  pullRequests: string
  issues: string
  repositories: string
  starsGiven: string
  languages: string
  followedBy: string
  followers: string
  following: string
  starsEarned: string
  watching: string
  sponsoring: string
  contributions: string
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/inacio-dev/inacio-dev/main/metrics.svg',
      {
        next: { revalidate: 3600 }, // Cache por 1 hora
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const svgText = await response.text()

    // Debug: Log do conteúdo SVG (remover depois)
    // console.log('SVG Content preview:', svgText.substring(0, 500))

    // Funções auxiliares para extrair dados usando regex mais específicas
    const extractNumber = (text: string): string => {
      const match = text.match(/\d+/)
      return match ? match[0] : '0'
    }

    const findInSvg = (patterns: string[]): string => {
      for (const pattern of patterns) {
        const regex = new RegExp(pattern, 'i')
        const match = svgText.match(regex)
        if (match) {
          // Debug removido para produção
          // console.log(`Found match for pattern "${pattern}":`, match[0])
          return extractNumber(match[0])
        }
      }
      return '0'
    }

    // Padrões mais específicos baseados em diferentes formatos de metrics SVG
    const stats: GitHubStats = {
      commits: findInSvg([
        '(\\d+[,\\d]*).{0,10}[Cc]ommits?',
        '[Cc]ommits?.{0,10}(\\d+[,\\d]*)',
        'total.{0,10}(\\d+[,\\d]*).{0,10}commits?',
        '>(\\d+[,\\d]*)<.{0,50}[Cc]ommits?',
      ]),

      pullRequests: findInSvg([
        '(\\d+[,\\d]*).{0,10}[Pp]ull.{0,10}[Rr]equests?',
        '[Pp]ull.{0,10}[Rr]equests?.{0,10}(\\d+[,\\d]*)',
        'opened.{0,10}(\\d+[,\\d]*).{0,10}pull.{0,10}requests?',
        '>(\\d+[,\\d]*)<.{0,50}[Pp]ull.{0,10}[Rr]equests?',
      ]),

      issues: findInSvg([
        '(\\d+[,\\d]*).{0,10}[Ii]ssues?',
        '[Ii]ssues?.{0,10}(\\d+[,\\d]*)',
        'opened.{0,10}(\\d+[,\\d]*).{0,10}issues?',
        '>(\\d+[,\\d]*)<.{0,50}[Ii]ssues?',
      ]),

      repositories: findInSvg([
        '(\\d+[,\\d]*).{0,10}[Rr]epositories',
        '[Rr]epositories.{0,10}(\\d+[,\\d]*)',
        '>(\\d+[,\\d]*)<.{0,50}[Rr]epositories',
        '(\\d+[,\\d]*).{0,10}repos',
      ]),

      starsGiven: findInSvg([
        '[Ss]tarred.{0,10}(\\d+[,\\d]*)',
        '(\\d+[,\\d]*).{0,10}starred',
        'given.{0,10}(\\d+[,\\d]*).{0,10}stars?',
        '>(\\d+[,\\d]*)<.{0,50}[Ss]tarred',
      ]),

      languages: findInSvg([
        '(\\d+)\\s+Languages?',
        '[Ll]anguages?\\s+(\\d+)',
        'language[^>]*>(\\d+)<',
        'Languages.*?(\\d+)',
      ]),

      followedBy: findInSvg([
        '[Ff]ollowed\\s+by\\s+(\\d+)',
        '(\\d+)\\s+users?\\s+follow',
        'followedBy[^>]*>(\\d+)<',
      ]),

      followers: findInSvg([
        '(\\d+)\\s+[Ff]ollowers?',
        '[Ff]ollowers?\\s+(\\d+)',
        'followers[^>]*>(\\d+)<',
      ]),

      following: findInSvg([
        '[Ff]ollowing.{0,10}(\\d+[,\\d]*)',
        '(\\d+[,\\d]*).{0,10}following',
        '>(\\d+[,\\d]*)<.{0,50}[Ff]ollowing',
      ]),

      starsEarned: findInSvg([
        '(\\d+[,\\d]*).{0,10}[Ss]targazers?',
        '[Ss]targazers?.{0,10}(\\d+[,\\d]*)',
        'earned.{0,10}(\\d+[,\\d]*).{0,10}stars?',
        '>(\\d+[,\\d]*)<.{0,50}[Ss]targazers?',
      ]),

      watching: findInSvg([
        '(\\d+[,\\d]*).{0,10}[Ww]atchers?',
        '[Ww]atchers?.{0,10}(\\d+[,\\d]*)',
        '[Ww]atching.{0,10}(\\d+[,\\d]*)',
        '>(\\d+[,\\d]*)<.{0,50}[Ww]atchers?',
      ]),

      sponsoring: findInSvg([
        '[Ss]ponsoring.{0,10}(\\d+[,\\d]*)',
        '(\\d+[,\\d]*).{0,10}sponsoring',
        '>(\\d+[,\\d]*)<.{0,50}[Ss]ponsoring',
      ]),

      contributions: findInSvg([
        '[Cc]ontributed.{0,10}to.{0,10}(\\d+[,\\d]*)',
        '(\\d+[,\\d]*).{0,10}repositories',
        'contributed.{0,10}(\\d+[,\\d]*)',
        '>(\\d+[,\\d]*)<.{0,50}[Cc]ontributed',
      ]),
    }

    // Debug: Log das estatísticas extraídas
    // console.log('Extracted stats:', stats)

    return stats
  } catch (error) {
    console.error('Erro ao buscar estatísticas do GitHub:', error)

    // Fallback com valores estáticos
    return {
      commits: '1355',
      pullRequests: '31',
      issues: '0',
      repositories: '24',
      starsGiven: '0',
      languages: '11',
      followedBy: '3',
      followers: '3',
      following: '2',
      starsEarned: '0',
      watching: '19',
      sponsoring: '0',
      contributions: '44',
    }
  }
}
