import { Metadata } from "next";
import FAQs from "./components/FAQs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ExchangesAndReturns from "./components/ExchangesAndReturns";
import AboutUs from "./components/AboutUs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "TERMS & F.A.Q | UrbanAvenue®",
  description: "Contact Page",
};

const About = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-16">
      <Breadcrumb className="w-full max-w-[76.875rem] mx-auto xs:px-6 px-8 mt-24">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-lg">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/contact" className="text-lg">
              Contact
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/about" className="text-lg">
              Terms & F.A.Q
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="max-w-[76.875rem] mx-auto xs:px-6 px-8 flex justify-center h-auto gap-16 items-center flex-col">
        <FAQs />
        <PrivacyPolicy />
        <ExchangesAndReturns />
        <AboutUs />
      </div>
    </div>
  );
};

export default About;
