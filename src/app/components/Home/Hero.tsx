
'use client';
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useRef } from "react"

const images = [
  '/carouselimg/img1.png',
  '/carouselimg/img4.png',
  '/carouselimg/img2.png',
  '/carouselimg/img3.png',
  '/carouselimg/img5.png',
];

export function Hero() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full h-[350px]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
      {images.map((image, index) => (
        <CarouselItem key={index}>
          <div className="h-full w-full my-2">
            <Card className="h-full w-full">
              <CardContent className="flex h-[350px] w-full items-center justify-center overflow-hidden rounded-2xl p-2">
                <img
                  src={image}
                  alt={`Hero Image ${index + 1}`}
                  className="object-cover h-[350px] w-full rounded-2xl"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer rounded-full bg-white/50 p-2 shadow-md hover:bg-white" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer rounded-full bg-white/50 p-2 shadow-md hover:bg-white" />
    </Carousel>
  )
}

export default Hero