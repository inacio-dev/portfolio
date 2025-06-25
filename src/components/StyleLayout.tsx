import Header from './Header'

export default async function StyleLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  params?: Promise<{ locale: string }>
}>) {
  return (
    <>
      <Header />
      <main className="m-4 flex h-full flex-col items-start justify-center lg:mx-12">
        {children}
      </main>
    </>
  )
}
