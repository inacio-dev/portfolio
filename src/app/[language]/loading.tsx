import Spinner from '@/src/assets/Spinner'
import MainSection from '@/src/components/MainSection'

export default function Loading() {
  return (
    <MainSection>
      <Spinner className="h-20 w-20 fill-slate-dark-6 transition-all duration-500 dark:fill-slate-light-3" />
    </MainSection>
  )
}
