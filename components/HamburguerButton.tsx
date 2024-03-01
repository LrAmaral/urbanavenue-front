'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import MobileNavLink from './MobileNavLink'
import { containerVars } from '@/app/utils/containerVars'
import { menuVars } from '@/app/utils/menuVars'

const HamburguerButton = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    const setResize = () =>
      innerWidth >= 768 && menuOpen ? setMenuOpen(false) : null

    window.addEventListener('resize', setResize)
  }, [menuOpen])

  const pathname = usePathname()

  const pages = [
    {
      id: 'shop',
      label: 'shop',
      href: '/shop',
      active: pathname === `/shop`,
    },
    {
      id: 'contact',
      label: 'contact',
      href: '/contact',
      active: pathname === `/contact`,
    },
    {
      id: 'lookbook',
      label: 'lookbook',
      href: '/lookbook',
      active: pathname === `/lookbook`,
    },
  ]

  return (
    <div className="flex justify-between w-full md:hidden">
      <motion.button
        animate={menuOpen ? 'open' : 'closed'}
        onClick={toggleMenu}
        className="flex flex-col space-y-1 justify-center scale-150 z-10"
      >
        <motion.span
          variants={{
            closed: { width: 16, rotate: 0, y: 0 },
            open: { width: 20, rotate: 45, y: 5 },
          }}
          className="w-5 h-px bg-black block"
        />
        <motion.span
          variants={{
            closed: {
              x: 0,
              width: 12,
              transition: { duration: 0.7 },
            },
            open: {
              x: -45,
              transition: { duration: 0.4 },
            },
          }}
          className="w-5 h-px bg-black block"
        />
        <motion.span
          variants={{
            closed: { width: 8, rotate: 0, y: 0 },
            open: { width: 20, rotate: -45, y: -5 },
          }}
          className="h-px bg-black block"
        />
      </motion.button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed md:hidden left-0 origin-top top-0 bg-white w-full h-screen flex items-center justify-center"
          >
            <motion.div
              onClick={toggleMenu}
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="gap-20 flex flex-col justify-center items-center text-lg"
            >
              {pages.map(({ id, label, href, active }) => (
                <MobileNavLink
                  key={id}
                  href={href}
                  label={label}
                  className={
                    active
                      ? `text-black font-semibold`
                      : `text-muted-foreground`
                  }
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HamburguerButton
