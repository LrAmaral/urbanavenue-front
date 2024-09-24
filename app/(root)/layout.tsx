import { Suspense } from "react";
import { Footer } from "../../components/Footer/footer";
import { MainNav } from "../../components/Header/header";
import Loading from "./loading";

export default function Rootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center w-full h-auto overflow-hidden">
      <MainNav />
      <Suspense fallback={<Loading h="80px" />}>{children}</Suspense>
      <Footer />
    </div>
  );
}
