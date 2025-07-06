import Image from 'next/image'

import CircularCarousel from '@/components/CircularCarousel'
import LandingHome from '@/components/LandingHome'
import TechNetworkAnimation from '@/components/TechNetworkAnimation'

export default async function Home() {
  return (
    <>
      <div className="relative min-h-[75svh] w-full overflow-hidden rounded-4xl">
        <Image
          src="/home.jpg"
          alt="Background image"
          className="object-cover opacity-50"
          fill
          sizes="100vw"
          priority
        />
        <TechNetworkAnimation />
        <LandingHome />
      </div>
      <CircularCarousel />
    </>
  )
}
