"use client";

import React from "react";
import { useCart } from "@/providers/cart-context";
import Image from "next/image";
import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/Custom/wrapper";
import { createOrder } from "@/app/api/order";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const {
    cartItems,
    total,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
  } = useCart();
  const hasItems = cartItems.length > 0;
  const route = useRouter();

  const handlePlaceOrder = async () => {
    try {
      await createOrder(cartItems, total);
      toast("Pedido realizado com sucesso!");
      route.push("/payment");
      clearCart();
    } catch (error) {
      console.error("Erro ao realizar o pedido:", error);
      alert("Erro ao realizar o pedido. Tente novamente.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Wrapper className="mt-24 md:mt-32 lg:mt-40">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

        {hasItems ? (
          <div className="flex flex-col md:flex-row justify-between items-start md:space-x-8 w-full">
            <div className="space-y-4 w-full md:w-2/3">
              {cartItems.map((item) => (
                <div
                  key={`${item.size}`}
                  className="flex flex-col md:flex-row justify-between items-center p-4 border rounded-md space-y-4 md:space-y-0"
                >
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <div>
                      <p className="text-lg font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Size: {item.size.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between md:justify-end w-full space-x-4 mt-2 md:mt-0">
                    <div className="flex items-center space-x-2">
                      {item.quantity > 1 ? (
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
                        >
                          <Minus size={16} />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItemFromCart(item.id, item.size)}
                        >
                          <Trash size={16} />
                        </Button>
                      )}
                      <span className="text-md font-medium">
                        {item.quantity}
                      </span>
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
                    <p className="text-lg font-medium mt-2 md:mt-0">
                      R${" "}
                      {(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center w-full md:w-1/3 border p-4 rounded-lg space-y-2 mt-8 md:mt-0">
              <div className="flex justify-between items-center font-semibold text-xl w-full">
                <p>Subtotal:</p>
                <p>R$ {total.toFixed(2).replace(".", ",")}</p>
              </div>

              <Button
                className="w-full bg-zinc-900 text-white py-3 font-bold rounded-lg hover:bg-zinc-800 transition-colors ease-in-out mt-6"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your order list is empty.</p>
        )}
      </Wrapper>
    </div>
  );
}
