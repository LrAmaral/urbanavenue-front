import { Footer } from '@/components/Footer'
import { MainNav } from '@/components/MainNav'

export default function Rootlayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <MainNav />
      {children}
      <Footer />
    </div>
  )
}
