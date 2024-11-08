"use client";

import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { useCart } from "@/providers/cart-context";
import Image from "next/image";

const CartSheet = () => {
  const { cartItems, total } = useCart();

  return (
    <motion.div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="p-0">
            <ShoppingBag size={32} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="font-bold flex gap-2">
              <ShoppingBag size={28} /> Bag
            </SheetTitle>
            <SheetDescription>
              {cartItems.length > 0 ? "Your products:" : "Your bag is empty."}
            </SheetDescription>
            <Separator />
          </SheetHeader>

          <div className="flex flex-col space-y-4 my-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={40}
                    height={40}
                  />
                  <p>{item.title}</p>
                </div>
                <p>
                  {item.quantity} x R$ {item.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-lg">
            <p>Total:</p>
            <p>R$ {total.toFixed(2).replace(".", ",")}</p>
          </div>

          <SheetFooter>
            <SheetClose asChild className="flex w-full">
              <Button type="submit" disabled={cartItems.length === 0}>
                Finish Order
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
};

export default CartSheet;
