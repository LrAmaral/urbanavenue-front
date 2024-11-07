import { Product } from "@/lib/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/search`;

const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await axios.get(URL, {
      params: { query },
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    const transformedData = response.data.map((item: any) => ({
      ...item,
    }));

    return transformedData;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Erro na requisição:",
        error.response.status,
        error.response.data
      );
      throw new Error(`Failed to fetch products: ${error.response.statusText}`);
    } else if (error.request) {
      console.error("Erro na requisição sem resposta:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Erro desconhecido:", error.message);
      throw new Error(`Unknown error: ${error.message}`);
    }
  }
};

export default searchProducts;
