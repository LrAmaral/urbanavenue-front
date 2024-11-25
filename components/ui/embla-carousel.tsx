"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EmblaCarouselProps {
  children: React.ReactNode;
  options?: any;
  onSlideChange?: (index: number) => void;
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({
  children,
  options,
  onSlideChange,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const slidesCount = React.Children.count(children);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        if (onSlideChange) {
          onSlideChange(emblaApi.selectedScrollSnap());
        }
      });
      emblaApi.reInit();
    }
  }, [emblaApi, onSlideChange]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {React.Children.map(children, (child) => (
            <div className="w-full flex-shrink-0">{child}</div>
          ))}
        </div>
      </div>
      {slidesCount > 1 && (
        <>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            onClick={scrollPrev}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            onClick={scrollNext}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default EmblaCarousel;
