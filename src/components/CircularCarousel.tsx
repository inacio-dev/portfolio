'use client'

import React from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

interface CarouselImage {
  id: string
  src: string
  alt: string
}

export default function CircularImageCarousel() {
  const imageNames = [
    'next',
    'vite',
    'vue',
    'astro',
    'angular',
    'react',
    'django',
    'flask',
    'fastapi',
    'node',
    'fastify',
    'nest',
    'typescript',
    'javascript',
    'java',
    'c',
    'python',
    'docker',
    'kubernetes',
    'postgres',
    'mysql',
  ]
  const images: CarouselImage[] = imageNames.map((name, index) => ({
    id: `img-${index}`,
    src: `/carousel/${name}.png`,
    alt: `Imagem ${index + 1}`,
  }))

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 2000, stopOnInteraction: false })],
  )

  return (
    <div className="relative mt-4 w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div
              key={image.id}
              className="min-w-0 flex-[0_0_50%] px-4 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] 2xl:flex-[0_0_16.666%]"
            >
              <div className="flex justify-center">
                <div className="relative h-20 w-20 overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r to-transparent" />
      <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l to-transparent" />
    </div>
  )
}
