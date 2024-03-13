import { User2 } from 'lucide-react'
import Link from 'next/link'

import CartSheet from './cart-sheet'
import HamburguerButton from './hamburguer-button'
import WebLinks from './web-links'
import { auth } from '@clerk/nextjs'
import { Input } from './ui/input'

export const MainNav = () => {
  const { userId } = auth()

  return (
    <nav className="fixed bg-white w-full z-10">
      <div className="max-w-[76.875rem] mx-auto h-[6rem] flex justify-between items-center xs:px-6 px-8">
        <div className="flex gap-8 items-center justify-between w-full">
          <div className="flex gap-4 flex-row-reverse md:flex-row items-center justify-end md:justify-between w-full">
            <Link
              href={'/'}
              className="font-extrabold text-2xl md:text-3xl font-sans"
            >
              UrbanAvenue
            </Link>
            <Input />
            <div className="flex gap-4 md:gap-16 items-center">
              <WebLinks />
              <HamburguerButton />
            </div>
          </div>
          <div className={`flex justify-center items-center gap-3 `}>
            {userId ? (
              <Link href={'/user'}>
                <User2 />
              </Link>
            ) : (
              <Link href={'/sign-in'}>
                <User2 />
              </Link>
            )}
            <CartSheet />
          </div>
        </div>
      </div>
    </nav>
  )
}
