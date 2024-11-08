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
  const hasItems = cartItems.length > 0;

  return (
    <motion.div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="p-2">
            <ShoppingBag size={32} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="font-bold flex items-center gap-2">
              <ShoppingBag size={28} /> Bag
            </SheetTitle>
            <SheetDescription>
              {hasItems ? "Your products:" : "Your bag is empty."}
            </SheetDescription>
            <Separator />
          </SheetHeader>

          <div className="flex flex-col space-y-4 my-4">
            {hasItems ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 border-b last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                    <p className="text-sm font-medium">{item.title}</p>
                  </div>
                  <p className="text-sm">
                    {item.quantity}x R${" "}
                    {item.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No items in your cart.
              </p>
            )}
          </div>

          {hasItems && (
            <div className="flex justify-between font-semibold text-lg px-2">
              <p>Total:</p>
              <p>R$ {total.toFixed(2).replace(".", ",")}</p>
            </div>
          )}

          <SheetFooter>
            <SheetClose asChild className="flex w-full mt-4">
              <Button type="submit" disabled={!hasItems} className="w-full">
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
