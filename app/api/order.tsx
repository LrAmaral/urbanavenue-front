import { CartItem } from "@/lib/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/order`;

export const createOrder = async (
  cartItems: CartItem[],
  total: number,
  userId: string
) => {
  try {
    const response = await axios.post(URL, {
      userId,
      items: cartItems.map((item) => ({
        productId: item.id,
        productTitle: item.title,
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
        "Request error:",
        error.response.status,
        error.response.data
      );
      throw new Error(`Failed to create order: ${error.response.statusText}`);
    } else if (error.request) {
      console.error("No response received from the server:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Unexpected error:", error.message);
      throw new Error(`Unknown error: ${error.message}`);
    }
  }
};
