import { CarouselComp } from "@/components/carousel";
import { ProductList } from "@/components/products-list";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="max-w-[76.875rem] space-y-16 xs:px-6 px-8">
        <CarouselComp />
        <h2>Dive into our categories</h2>
        <ProductList />
      </div>
    </div>
  )
}
