'use client'

import { User2, ShoppingBag, X, Menu } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { pages } from '@/app/utils/pages'

export const MainNav = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    const setResize = () =>
      innerWidth >= 768 && menuOpen ? setMenuOpen(false) : null

    window.addEventListener('resize', setResize)
  }, [menuOpen])

  return (
    <>
      <nav className="fixed bg-white w-full z-10">
        <div className="max-w-[76.875rem] mx-auto h-[6rem] flex justify-between items-center xs:px-6 px-8">
          <Link href={'/'} className="font-bold text-3xl z-10">
            UrbanAvenue
          </Link>
          <div className="flex gap-16 items-center">
            <div className="hidden md:flex gap-8">
              {pages.map(({ id, label, href }) => (
                <Link
                  key={id}
                  href={href}
                  className="hover:text-neutral-400 text-lg transition ease-in-out"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex justify-end gap-6 items-center w-full md:hidden">
              <button onClick={toggleMenu} className="z-10">
                {menuOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
            <div className="md:flex gap-2 hidden">
              <Link href={'/sign-in'}>
                <User2 />
              </Link>
              <Link href={'#'}>
                <ShoppingBag size={28} />
              </Link>
            </div>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div className="fixed md:hidden left-0 top-0 bg-white w-full h-screen">
                <div className="py-16 px-6 gap-8 flex flex-col justify-center items-center text-lg">
                  <Link
                    href={'/sign-in'}
                    className="flex gap-2 text-sm items-center "
                  >
                    <p>My account</p>
                    <User2 />
                  </Link>
                  {pages.map(({ id, label, href }) => (
                    <Link
                      key={id}
                      href={href}
                      className="hover:text-neutral-400 text-2xl transition ease-in-out"
                    >
                      {label}
                    </Link>
                  ))}
                  <Link href={'#'}>
                    <ShoppingBag />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  )
}
