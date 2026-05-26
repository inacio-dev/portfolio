# inaciorodrigues.dev.br — Portfólio

Portfólio pessoal e open source de **Inácio Rodrigues** — Desenvolvedor Full Stack Sênior e Engenheiro de Computação pela UFC.

> Repositório público. Sinta-se à vontade para usar como referência de stack, arquitetura ou estrutura de internacionalização.

## Stack

- **Next.js 16** — App Router, server actions, geração estática por locale
- **TypeScript** estrito + **Tailwind CSS v4** + **shadcn/ui**
- **next-intl** v4 — i18n com prefixo de path (pt-BR default, /en, /es) e pathnames traduzidos
- **next-themes** — dark-first com toggle e preferência do sistema
- **Google Tag Manager + Consent Mode v2** — analytics LGPD-compliant
- **Vercel Web Analytics + Speed Insights** — métricas e Core Web Vitals sem cookies, complementar ao GTM
- **Cloudflare Turnstile** — anti-spam invisível no form de contato
- **Resend** — entrega de email do form de contato (3k/mês no free tier)

## Estrutura

```
app/
  layout.tsx                root passthrough (Next exige existência)
  not-found.tsx             redirect → locale default
  sitemap.ts / robots.ts    multi-locale com hreflang
  globals.css               design system + tokens
  [locale]/
    layout.tsx              html lang, fontes, GTM, providers, header/footer
    page.tsx                home
    sobre/page.tsx          about
    projetos/page.tsx       projects
    experiencia/page.tsx    experience (timeline pro + acadêmico)
    certificados/page.tsx   certifications (agrupado por categoria)
    contato/page.tsx        contact (form + canais diretos)
    privacidade/page.tsx    privacy policy
    termos/page.tsx         terms of use
    not-found.tsx           404 amigável

components/
  Button.tsx / Link.tsx     wrappers com analytics opt-in
  CookieConsent.tsx         banner LGPD + Consent Mode v2
  LanguageSwitcher.tsx      troca locale preservando pathname
  ThemeToggle.tsx           light/dark/system
  ThemeProvider.tsx         wrapper next-themes
  icons/                    GitHub, LinkedIn, WhatsApp, Instagram
  layout/Header.tsx         nav sticky + mobile
  layout/Footer.tsx         tagline, social, legal
  forms/ContactForm.tsx     form com server action + Turnstile
  forms/Turnstile.tsx       widget Cloudflare invisible
  ui/                       shadcn primitives

i18n/
  routing.ts                defineRouting + pathnames traduzidos
  request.ts                getRequestConfig (server)
  navigation.ts             Link/redirect/usePathname tipados

lib/
  analytics.ts              trackEvent → GTM com prefixo portifolio_
  certifications.ts         catálogo dos PDFs
  projects.ts               catálogo de projetos
  site.ts                   SITE_URL, contato, whatsapp, mailto
  utils.ts                  cn (clsx + tailwind-merge)

messages/                   pt-BR.json, en.json, es.json
server/actions/             contact.ts (validação, Turnstile, Nodemailer)
proxy.ts                    middleware do next-intl
```

## Setup

```fish
# Node version (lê .nvmrc)
nvm use

# Dependências
pnpm install

# Variáveis de ambiente
cp .env.example .env
# edita .env conforme seu setup local

# Dev
pnpm dev
```

Visite [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Veja [.env.example](./.env.example) para a lista completa com comentários. Resumo:

- **Obrigatórias em prod**: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`
- **Analytics**: `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_COOKIE_DOMAIN`
- **Contato (opcionais)**: `RESEND_API_KEY` + `RESEND_FROM` para envio real; sem eles, server action grava em log
- **Anti-spam (opcionais)**: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`

## Scripts

```fish
pnpm dev            # dev server (Next + HMR)
pnpm build          # build de produção
pnpm start          # roda o build
pnpm lint           # ESLint
pnpm format         # Prettier
pnpm format:check   # check sem escrever
```

## Internacionalização

- `pt-BR` é o default — fica em `/`, `/sobre`, `/projetos`, etc (sem prefixo)
- `en` em `/en`, `/en/about`, `/en/projects`, etc
- `es` em `/es`, `/es/sobre-mi`, `/es/proyectos`, etc

Os segmentos são traduzidos no `routing.pathnames` e o middleware aplica as reescritas automaticamente. O `LanguageSwitcher` resolve o pathname canônico e troca o prefixo + segmento traduzido.

## Adicionar conteúdo

- **Projeto novo**: editar [lib/projects.ts](./lib/projects.ts) + adicionar entrada em `Projects.items.<key>` de cada `messages/*.json`
- **Certificado novo**: editar [lib/certifications.ts](./lib/certifications.ts) + colocar PDF em `public/certificados/<slug>.pdf`
- **Página nova**: criar `app/[locale]/<segmento>/page.tsx` + adicionar mapping em `i18n/routing.ts → pathnames`

## Deploy

Hospedado em produção em [inaciorodrigues.dev.br](https://inaciorodrigues.dev.br).

## Licença

MIT — sinta-se livre para forkear e adaptar como base do seu portfólio. Conteúdo textual (descrições de projetos, sobre, etc.) é meu — substitua pelo seu antes de publicar.
