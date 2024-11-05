export interface Address {
  id?: string;
  userId?: string;
  neighborhood: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}


export interface ProductProps {
  id: number;
  name: string;
  data: [];
};

export interface Size {
  id: string;
  name: string;
  value: string;
  stock: number;
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
  price: number;
  size: Size;
  images: Image[];
  isFeatured: boolean;
}

export type SizeOption = "small" | "medium" | "large" | "xlarge";

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
