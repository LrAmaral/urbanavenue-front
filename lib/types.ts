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
  images: Image[];
  productSizes: { size: { id: string; name: string }; stock: number }[];
  isFeatured: boolean;
}

export type SizeOption = "small" | "medium" | "large" | "xlarge";
