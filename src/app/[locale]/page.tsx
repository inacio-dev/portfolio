import Image from 'next/image'

import CircularCarousel from '@/components/CircularCarousel'

export default async function Home() {
  return (
    <>
      <div className="relative min-h-[75svh] w-full overflow-hidden rounded-4xl">
        <Image src="/home.jpg" alt="Background image" fill className="object-cover" priority />
        <div className="relative z-10 text-white">{/* content */}</div>
      </div>

      <CircularCarousel />
    </>
  )
}
