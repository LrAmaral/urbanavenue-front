export interface EmailPayload {
  recipient: string;
  subject: string;
  text: string;
  html?: string;
}

export interface Address {
  id?: string;
  userId?: string;
  fullName?: string;
  neighborhood: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  number: string;
  isPrimary: boolean;
}

export interface AddressResponse {
  addresses: Address[];
}

export interface ProductProps {
  id: number;
  name: string;
  data: [];
}

export type Role = "ADMIN" | "CLIENT";

export type User = {
  id?: string;
  name: string;
  email: string;
  cpf?: string;
  phoneNumber?: string;
  dateOfBirth: Date;
  orders?: Order[];
  role?: "ADMIN" | "CLIENT";
  addresses: Address[];
  createdAt?: Date;
  updatedAt?: Date;
};

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
  desc: string;
  images: { url: string }[];
  productSizes: { size: { id: string; name: string }; stock: number }[];
  category: { id: string; name: string; createdAt: string; updatedAt: string };
  sales: number;
  createdAt: string;
}

export interface Size {
  id: string;
  name: string;
  stock: number;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  size: Size;
}

export interface Order {
  id: string;
  createdAt: string;
  status: string;
  total: string;
  address: Address;
  isPaid: boolean;
  userId?: string;
  orderItems: {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    product: {
      id: string;
      categoryId: string;
      title: string;
      price: number;
      category: {
        id: string;
        name: string;
      };
      images: {
        id: string;
        productId: string;
        url: string;
      }[];
      productSizes: {
        id: string;
        sizeId: string;
        size: {
          id: string;
          name: string;
          value: string;
        };
        stock: number;
      }[];
    };
  }[];
}

export type SizeOption = "small" | "medium" | "large" | "xlarge";
