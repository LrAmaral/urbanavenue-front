"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const data = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1586396847415-2c76ae7e79fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1614975059433-b7638ab0b026?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1529995586326-a1ee8f0ee795?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }
]

export function CarouselComp() {
  return (
    <Carousel className="mt-28" plugins={[Autoplay({ delay: 5000 })]}>
      <CarouselContent>
        {data.map(({ id, src }) => (
          <CarouselItem
            key={id}
            className="flex items-center w-full justify-center"
          >
            <Image
              src={src}
              alt="carousel"
              width={800}
              height={600}
              className="rounded-lg object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
