import { Product } from "../types/product";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getProduct;

// import { Product } from "../types/product";
// import api from "@/lib/axios";

// const URL = `${api}/products`;

// const getProduct = async (id: string): Promise<Product> => {
//   try {
//     const res = await fetch(`${URL}/${id}`);
//     if (!res.ok) {
//       throw new Error(`Erro ao buscar produto: ${res.statusText}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export default getProduct;
