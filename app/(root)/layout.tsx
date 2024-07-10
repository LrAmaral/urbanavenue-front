import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";

export default function Rootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <MainNav />
      {children}
      <Footer />
    </div>
  );
}
