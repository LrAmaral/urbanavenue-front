export type ProductProps = {
  id: number
  name: string
  data: []
}

export interface Product {
  id: string;
  title: string;
  price: string;
  size: Size;
  images: Image;
  isFeatured: boolean;
}

// export interface Product = {
//   id: string;
//   title: string;
//   price: number;
//   type: string;
//   size: string;
//   desc: string;
//   stock: number;
//   createdAt: string;
//   isFeatured: boolean;
//   isArchived: boolean;
// };