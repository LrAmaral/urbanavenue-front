import { Footer } from "../../components/Footer/footer";
import { MainNav } from "../../components/Header/header";

export default function Rootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center w-full h-auto overflow-hidden">
      <MainNav />
      {children}
      <Footer />
    </div>
  );
}
