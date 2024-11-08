"use client";

import { useCart } from "@/providers/cart-context";
import Image from "next/image";
import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Wrapper } from "@/components/Custom/wrapper";

export default function OrdersPage() {
  const { cartItems, total, removeItemFromCart, updateItemQuantity } =
    useCart();
  const hasItems = cartItems.length > 0;

  return (
    <div className="container mx-auto p-4">
      <Wrapper className="mt-24 md:mt-40">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

        {hasItems ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.size}`}
                className="flex justify-between items-center p-4 border rounded-md shadow-sm"
              >
                <div className="flex items-center justify-between w-full space-x-3">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <div>
                      <p className="text-lg font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateItemQuantity(
                          item.id,
                          item.size,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateItemQuantity(
                          item.id,
                          item.size,
                          item.quantity + 1
                        )
                      }
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-medium">
                      R${" "}
                      {(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>
                    <Button
                      variant="ghost"
                      className="p-2"
                      onClick={() => removeItemFromCart(item.id, item.size)}
                    >
                      <Trash size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Separator className="my-4" />
            <div className="flex justify-between items-center font-semibold text-xl">
              <p>Total:</p>
              <p>R$ {total.toFixed(2).replace(".", ",")}</p>
            </div>

            <Button className="w-full bg-zinc-900 text-white py-3 font-bold rounded-lg hover:bg-zinc-800 transition-colors ease-in-out mt-6">
              Place Order
            </Button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your order list is empty.</p>
        )}
      </Wrapper>
    </div>
  );
}
