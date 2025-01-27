import { Metadata } from "next";

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
    <div className="flex items-center justify-center h-screen w-full">
      {children}
    </div>
  );
}
