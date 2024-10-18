import { useAuth } from "@clerk/nextjs";
import { Address } from "@/lib/address";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

export interface User {
  userId?: string;
  name: string;
  email: string;
  role: string;
  addresses: Address[];
}

const getUser = async (userId: string): Promise<User | null> => {
  const res = await fetch(`${URL}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar usuário");
  }

  const data = await res.json();
  return data;
};

const createUser = async (userData: User): Promise<User> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Erro ao salvar usuário: ${errorDetails}`);
  }

  const data = await res.json();
  return data;
};

const updateAddress = async (
  userId?: string,
  addresses?: Address
): Promise<void> => {
  const res = await fetch(`${URL}/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ addresses }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar endereços");
  }
};

const deleteAddress = async (
  userId: string,
  addressId: string
): Promise<void> => {
  const res = await fetch(`${URL}/${userId}/addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Erro ao excluir endereço: ${errorDetails}`);
  }
};

export { getUser, createUser, updateAddress, deleteAddress };
