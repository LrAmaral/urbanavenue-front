"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Size {
  id: string;
  name: string;
  stock: number;
}

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  size: Size;
}

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string, size: Size) => void;
  updateItemQuantity: (id: string, size: Size, quantity: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Verifica se o código está sendo executado no navegador
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (error) {
          console.error("Erro ao carregar o carrinho:", error);
        }
      }
      setIsInitialized(true); // Marca como inicializado após o carregamento
    }
  }, []);

  useEffect(() => {
    // Verifica se `isInitialized` é verdadeiro antes de atualizar o `localStorage`
    if (isInitialized) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

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
