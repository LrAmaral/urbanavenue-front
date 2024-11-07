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
}

export interface SizeWithStock {
  size: {
    id: string;
    name: string;
  };
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
  images: { url: string }[];
  sizes: {
    id: string;
    sizeId: string;
    stock: number;
    size: {
      id: string;
      name: string;
      value: string;
    };
  }[];
  isFeatured: boolean;
}

export type SizeOption = "small" | "medium" | "large" | "xlarge";
