'use client'

import { usePathname } from 'next/navigation'
import MobileNavLink from './MobileNavLink'

const WebLinks = () => {
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
    <div className="hidden md:flex gap-6">
      {pages.map(({ id, label, href, active }) => (
        <MobileNavLink
          key={id}
          href={href}
          label={label}
          className={
            active ? `text-black font-semibold` : `text-muted-foreground`
          }
        />
      ))}
    </div>
  )
}

export default WebLinks
