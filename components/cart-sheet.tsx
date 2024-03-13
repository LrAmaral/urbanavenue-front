'use client'

import { ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

import { Button } from './ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from './ui/sheet'
import { Separator } from './ui/separator'

const CartSheet = () => {
  const [openCart, setOpenCart] = useState(false)

  const toggleCart = () => setOpenCart(!openCart)

  return (
    <motion.div
      onClick={toggleCart}
      variants={{
        open: { width: 120, right: 120 },
        closed: { width: 0, right: 0 },
      }}
    >
      <Sheet>
        <SheetTrigger asChild className="border-0 p-0 hover:bg-white">
          <Button variant="outline" className="p-0">
            <ShoppingBag size={32} />
          </Button>
        </SheetTrigger>
        <SheetContent className="">
          <SheetHeader>
            <SheetTitle className="font-bold flex gap-2">
              <ShoppingBag size={28} /> Bag
            </SheetTitle>
            <SheetDescription>Your bag is empty.</SheetDescription>
            <Separator />
          </SheetHeader>
          <div className="flex flex-col justify-center h-40">
            <div className="space-y-2">
              <p className="font-semibold">Your products:</p>
              <p className="font-bold text-lg">
                Total: <span>$40.00</span>
              </p>
            </div>
          </div>
          <SheetFooter>
            <SheetClose
              asChild
              className="flex items-center justify-center flex-col w-full"
            >
              <Button type="submit">Finish Order</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </motion.div>
  )
}

export default CartSheet
