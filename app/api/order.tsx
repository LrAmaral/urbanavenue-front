import { Address, CartItem, Order } from "@/lib/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/order`;

export const createOrder = async (
  cartItems: CartItem[],
  total: number,
  userId: string,
  selectedAddress: Address
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
      address: selectedAddress, 
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


export const getOrder = async (id: string): Promise<Order> => {
  try {
    const response = await axios.get(`${URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Erro na requisição:",
        error.response.status,
        error.response.data
      );
      throw new Error(`Erro ao buscar pedido: ${error.response.statusText}`);
    } else if (error.request) {
      console.error("Erro na requisição sem resposta:", error.request);
      throw new Error("Sem resposta do servidor");
    } else {
      console.error("Erro desconhecido:", error.message);
      throw new Error(`Erro desconhecido: ${error.message}`);
    }
  }
};

export const getOrders = async (userId: string): Promise<Order[]> => {
  try {
    const response = await axios.get(`${URL}?userId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Erro na requisição:",
        error.response.status,
        error.response.data
      );
      throw new Error(`Failed to fetch orders: ${error.response.statusText}`);
    } else if (error.request) {
      console.error("Erro na requisição sem resposta:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Erro desconhecido:", error.message);
      throw new Error(`Unknown error: ${error.message}`);
    }
  }
};
