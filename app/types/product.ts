export type ProductProps = {
  id: number;
  name: string;
  data: [];
};

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Image {
  id: string;
  productId: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  size: Size;
  images: Image[];
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
