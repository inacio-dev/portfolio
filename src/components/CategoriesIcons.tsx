import clsx from 'clsx'
import IconDesign from '../svg/icons/Design'
import IconDeveloper from '../svg/icons/Developer'
import IconEngineer from '../svg/icons/Engineer'
import IconMarketing from '../svg/icons/Marketing'

interface CategoriesIconsProps {
  className: string
  categories: number[]
}

export default function CategoriesIcons({ className, categories }: CategoriesIconsProps) {
  return (
    <div className={clsx('grid-cols-2 items-center justify-center gap-2', className)}>
      <IconDeveloper
        className={clsx(categories.includes(1) ? 'fill-slate-light-1' : 'fill-slate-dark-8')}
      />
      <IconEngineer
        className={clsx(categories.includes(2) ? 'fill-slate-light-1' : 'fill-slate-dark-8')}
      />
      <IconDesign
        className={clsx(categories.includes(3) ? 'fill-slate-light-1' : 'fill-slate-dark-8')}
      />
      <IconMarketing
        className={clsx(categories.includes(4) ? 'fill-slate-light-1' : 'fill-slate-dark-8')}
      />
    </div>
  )
}
