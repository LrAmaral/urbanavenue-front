import axios from "axios";
import { Product } from "@/lib/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
      _t: new Date().getTime().toString(), 
    },
  });

  try {
    
    const response = await axios.get(url, {
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

export default getProducts;