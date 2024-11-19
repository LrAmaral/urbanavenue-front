"use client";

import { ShoppingCart, Trash } from "lucide-react";
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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CartSheet = () => {
  const { cartItems, total, removeItemFromCart } = useCart();
  const hasItems = cartItems.length > 0;
  const route = useRouter();

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleOrder = () => {
    if (totalQuantity === 0) {
      toast.error("You need to add items to your cart to place an order.");
    }

    route.push("/order");
  };

  return (
    <motion.div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="p-2 relative">
            <ShoppingCart />
            {totalQuantity > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="font-bold flex items-center gap-2">
              <ShoppingCart /> Cart
            </SheetTitle>
            <SheetDescription className="text-start">
              {hasItems ? "Your products:" : "Your bag is empty."}
            </SheetDescription>
            <Separator />
          </SheetHeader>

          <div className="flex flex-col space-y-2 my-4">
            {hasItems ? (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex justify-between items-center border-b last:border-b-0 py-3 gap-4"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="rounded-md flex-shrink-0"
                    />
                    <div className="flex flex-col w-full">
                      <p className="text-sm font-medium truncate w-[120px] sm:w-[200px]">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.quantity}x R$
                        {item.price.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="p-2 flex-shrink-0"
                    onClick={() => removeItemFromCart(item.id, item.size)}
                  >
                    <Trash
                      size={18}
                      className="text-gray-500"
                    />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No items in your cart.
              </p>
            )}
          </div>

          {hasItems && (
            <div className="flex justify-between font-semibold text-lg">
              <p>Total:</p>
              <p>R$ {total.toFixed(2).replace(".", ",")}</p>
            </div>
          )}

          <SheetFooter>
            <SheetClose asChild className="flex w-full mt-4">
              <Button
                type="submit"
                onClick={handleOrder}
                disabled={!hasItems}
                className="w-full"
              >
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
