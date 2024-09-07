import { Metadata } from "next";
import Gallery from "./components/gallery";
import { Wrapper } from "@/components/Custom/wrapper";

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
              <Gallery />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Lookbook;
