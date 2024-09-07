import { Metadata } from "next";
import { Wrapper } from "@/components/Custom/wrapper";
import Image from "next/image";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "takeatrip | UrbanAvenue®",
  description: "Lookbook Page",
};

const Lookbook = () => {
  return (
    <div className="w-full flex-col items-center flex justify-center">
      <Wrapper className="mt-24">
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-full text-center space-y-4">
              <div className="flex w-full mt-4 justify-center items-center flex-col">
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
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Lookbook;
