import { Footer } from '@/components/layout/Footer'
import { MainNav } from '@/components/layout/MainNav'

export default function Rootlayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <MainNav />
      {children}
      <Footer />
    </div>
  )
}
