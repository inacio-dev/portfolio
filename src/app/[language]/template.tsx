import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  )
}
