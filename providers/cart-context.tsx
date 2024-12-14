"use client";

import { CartItem, Size } from "@/lib/types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string, size: Size) => void;
  updateItemQuantity: (id: string, size: Size, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && user?.id) {
      const storedCart = localStorage.getItem(`${user.id}_cartItems`);
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (error) {
          console.error("Erro ao carregar o carrinho:", error);
        }
      }
      setIsInitialized(true);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isInitialized && user?.id) {
      localStorage.setItem(`${user.id}_cartItems`, JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized, user?.id]);

  const addItemToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.size.id === newItem.size.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: Math.min(
            updatedItems[existingItemIndex].quantity + newItem.quantity,
            newItem.size.stock
          ),
        };
        return updatedItems;
      }

      return [...prevItems, { ...newItem, quantity: newItem.quantity }];
    });
  };

  const removeItemFromCart = (id: string, size: Size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size.id === size.id))
    );
  };

  const updateItemQuantity = (id: string, size: Size, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size.id === size.id
          ? {
              ...item,
              quantity: Math.min(Math.max(1, quantity), item.size.stock),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    if (user?.id) {
      localStorage.removeItem(`${user.id}_cartItems`);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
