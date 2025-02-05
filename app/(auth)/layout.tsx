import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UrbanAvenue® - Login",
  description: "Login",
};

export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Link
        href={"/"}
        className="text-4xl font-bold text-center text-gray-800 mb-6"
      >
      UrbanAvenue
      </Link>
      {children}
    </div>
  );
}
