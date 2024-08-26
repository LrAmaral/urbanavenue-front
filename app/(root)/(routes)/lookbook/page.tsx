import { Metadata } from "next";
import Gallery from "./components/Gallery";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "takeatrip | UrbanAvenue®",
  description: "Lookbook Page",
};

const Lookbook = () => {
  return (
    <div className="w-full flex-col items-center flex justify-center">
      <Breadcrumb className="w-full max-w-[76.875rem] mx-auto xs:px-6 px-8 mt-24">
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
      <div className="max-w-[76.875rem] xs:px-6 px-8 mx-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full text-center space-y-4">
            <p className="text-2xl font-semibold">Inspire Your Look</p>
            <br />
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lookbook;
