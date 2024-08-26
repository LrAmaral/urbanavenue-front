import { ProductList } from "@/components/products-list";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="max-w-[76.875rem] mt-24 mb-16 space-y-24 xs:px-6 px-8">
        <ProductList />
      </div>
    </div>
  );
}
