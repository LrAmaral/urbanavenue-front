import { ShoppingBag } from 'lucide-react'
import React from 'react'
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
  return (
    <Sheet>
      <SheetTrigger asChild className="border-0 p-0 hover:bg-white">
        <Button variant="outline" className="p-0">
          <ShoppingBag size={32} />
        </Button>
      </SheetTrigger>
      <SheetContent>
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
  )
}

export default CartSheet
