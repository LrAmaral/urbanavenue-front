import { ProductList } from "@/components/Product/products-list";
import { Wrapper } from "@/components/wrapper";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Wrapper className="my-24">
        <ProductList />
      </Wrapper>
    </div>
  );
}
