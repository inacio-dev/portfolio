import Header from './Header'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
  params?: Promise<{ locale: string }>
}>) {
  return (
    <>
      <Header />
      <main className="mt-4 flex items-start justify-center">{children}</main>
    </>
  )
}
