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
    <Link
      className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/10"
      {...props}
    >
      {children}
    </Link>
  )
}
