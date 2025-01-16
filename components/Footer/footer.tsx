import Link from "next/link";
import { Wrapper } from "../Custom/wrapper";
import Image from "next/image";

import logo from "../../public/favicon.ico";

export const Footer = () => {
  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <footer className="w-full mt-40 bg-white text-gray-800">
      <Wrapper className="py-8 px-6 h-60 md:h-40">
        <div className="flex px-6 flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          <Link href={"/"} className="text-2xl font-bold">
            <Image src={logo} width={48} height={48} alt="logo" />
          </Link>
          <div className="text-sm">
            <div className="mb-4 flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-6">
              <Link
                href="/contact#about"
                className="hover:underline"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:underline"
              >
                Contact
              </Link>
            </div>
            <p className="md:text-left">
              <span>©</span> {currentYear} UrbanAvenue, Inc. All rights
              reserved.
            </p>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};
