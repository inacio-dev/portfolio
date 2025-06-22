import { ComponentProps } from 'react'
import { Link } from '@/i18n/navigation'

type LinkProps = ComponentProps<typeof Link>

export default async function NavLink({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode
}> &
  LinkProps) {
  return (
    <Link className="p-2" {...props}>
      {children}
    </Link>
  )
}
