import Spinner from '@/src/assets/Spinner'

export default function Loading() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-light-3 transition-all duration-500 dark:bg-slate-dark-1">
      <Spinner className="h-20 w-20 fill-slate-dark-1 transition-all duration-500 dark:fill-slate-light-1" />
    </main>
  )
}
