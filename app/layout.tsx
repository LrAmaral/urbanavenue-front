import { Work_Sans as worksans } from 'next/font/google'

import type { Metadata } from 'next'
import './styles/globals.css'

const work = worksans({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'UrbanAvenue',
  description: 'start page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${work.className} overflow-x-hidden h-screen`}>
        {children}
      </body>
    </html>
  )
}
