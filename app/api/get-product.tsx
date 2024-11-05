import { Product } from "@/lib/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${URL}/${id}`, {
      headers: {
        "Cache-Control": "no-cache",
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
      throw new Error(`Failed to fetch product: ${error.response.statusText}`);
    } else if (error.request) {
      console.error("Erro na requisição sem resposta:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Erro desconhecido:", error.message);
      throw new Error(`Unknown error: ${error.message}`);
    }
  }
};

export default getProduct;
