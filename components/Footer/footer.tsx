import Link from "next/link";
import { Wrapper } from "../Custom/wrapper";
import Image from "next/image";

import logo from "../../public/favicon.ico";

export const Footer = () => {
  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <footer className="w-full mt-40 bg-white text-gray-800">
      <Wrapper className="py-8 h-60 md:h-40">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <Link href={"/"} className="text-2xl font-bold">
            <Image src={logo} width={48} height={48} alt="logo"/>
          </Link>
          <div className="text-sm">
            <p className="mb-2 text-center md:text-start">
              <Link href="/contact#about" className="hover:underline">
                About
              </Link>{" "}
              |
              <Link href="/contact" className="ml-2 hover:underline">
                Contact
              </Link>
            </p>
            <p className="">
              <span>©</span> {currentYear} UrbanAvenue, Inc. All rights
              reserved.
            </p>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};
