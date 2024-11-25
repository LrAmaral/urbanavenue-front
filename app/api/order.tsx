import { CartItem } from "@/lib/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

export const createOrder = async (cartItems: CartItem[], total: number) => {
  try {
    const response = await axios.post(URL, {
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Erro na requisição:",
        error.response.status,
        error.response.data
      );
      throw new Error(`Failed to create order: ${error.response.statusText}`);
    } else if (error.request) {
      console.error("Erro na requisição sem resposta:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Erro desconhecido:", error.message);
      throw new Error(`Unknown error: ${error.message}`);
    }
  }
};
