import AsideMenu from '@/src/components/AsideMenu'
import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <div className="flex w-full flex-row overflow-hidden">
        {children}

        <AsideMenu />
      </div>

      <Footer />
    </>
  )
}
