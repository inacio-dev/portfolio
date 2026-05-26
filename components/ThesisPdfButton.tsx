'use client'

import { FileText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

/**
 * Botão "Ler monografia completa" em estado desabilitado, com tooltip
 * explicando que ainda não está disponível.
 *
 * Botões `disabled` não disparam `mouseenter`/`focus` no DOM, então
 * envolvemos num `<span>` que captura os eventos e os repassa pro Radix
 * Tooltip. Esse é o workaround documentado pelo Radix.
 *
 * Quando o PDF estiver disponível, trocar este componente pelo
 * `<TrackedExternalLink>` original na página `/monografia`.
 */
interface Props {
  label: string
  tooltip: string
}

export function ThesisPdfButton({ label, tooltip }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0} aria-disabled="true" className="inline-flex">
          <Button size="lg" disabled className="font-medium">
            <FileText className="size-4" aria-hidden="true" />
            {label}
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}
