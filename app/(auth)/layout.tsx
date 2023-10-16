import { ClerkProvider } from '@clerk/nextjs'

export default function Authlayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <div className="flex items-center justify-center h-full w-full">
        {children}
      </div>
    </ClerkProvider>
  )
}
