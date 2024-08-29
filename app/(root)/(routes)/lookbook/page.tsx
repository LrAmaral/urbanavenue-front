import { Metadata } from "next";
import Gallery from "./components/Gallery";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Wrapper } from "@/components/wrapper";

export const metadata: Metadata = {
  title: "takeatrip | UrbanAvenue®",
  description: "Lookbook Page",
};

const Lookbook = () => {
  return (
    <div className="w-full flex-col items-center flex justify-center">
      <Wrapper className="mt-24">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-lg">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/lookbook" className="text-lg">
                Lookbook
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-full text-center space-y-4">
              <p className="text-2xl font-semibold">Inspire Your Look</p>
              <br />
              <Gallery />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Lookbook;
