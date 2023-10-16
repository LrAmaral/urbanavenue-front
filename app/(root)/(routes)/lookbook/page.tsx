import Image from 'next/image'

import { images } from '@/app/utils/images'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'takeatrip | UrbanAvenue',
  description: 'lookbook page',
}

const Lookbook = () => {
  return (
    <div className="w-full h-screen items-center flex flex-row justify-center">
      <div className="max-w-[76.875rem] xs:px-6 px-0 mx-auto">
        <div className="space-y-4">
          <p className="font-semibold text-lg">Where style meets comfort.</p>
          <ScrollArea className="border p-4 rounded-xl bg-neutral-800">
            <div className="flex gap-2">
              {images.map(({ id, src }) => (
                <Image
                  key={id}
                  src={src}
                  width={350}
                  height={400}
                  alt="image"
                  className="rounded-xl"
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export default Lookbook
