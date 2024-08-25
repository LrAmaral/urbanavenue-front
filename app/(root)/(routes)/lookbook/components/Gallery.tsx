"use client";

import Image from "next/image";

import { images } from "@/app/utils/imagesLink";

const Gallery = () => {
  return (
    <>
      <div className="flex w-full justify-center items-center flex-col">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 justify-items-center items-center rounded-2xl">
          {images.map(({ id, src }) => (
            <div
              key={id}
              className="cursor-pointer hover:scale-105 transition ease-in-out duration-500"
            >
              <Image
                src={src}
                width={1920}
                height={1080}
                loading="lazy"
                alt="image"
                className="rounded-2xl pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
