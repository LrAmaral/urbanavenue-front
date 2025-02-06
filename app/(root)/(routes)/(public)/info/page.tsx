import { Wrapper } from "@/components/Custom/wrapper";
import ExchangesAndReturns from "./components/exchanges-returns";

export default function Info() {
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-16">
      <Wrapper className="mt-16 sm:mt-24 md:mt-28">
        <div className="flex justify-center h-auto gap-16 items-center flex-col">
          <ExchangesAndReturns />
        </div>
      </Wrapper>
    </div>
  );
}
