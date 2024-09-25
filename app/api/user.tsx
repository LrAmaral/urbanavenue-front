import { Address } from "@/lib/address";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  addresses: Address[];
}

const getUser = async (userId: string): Promise<User | null> => {
  const res = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: userId,
  });

  if (!res.ok) {
    throw new Error("Erro ao salvar usuário");
  }

  return res.json();
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
    throw new Error("Erro ao salvar usuário");
  }

  return res.json();
};

const updateAddress = async (
  userId: string,
  addresses: Address
): Promise<void> => {
  const res = await fetch(`${URL}/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ addresses }),
  });

  console.log(res);
  if (!res.ok) {
    throw new Error("Erro ao atualizar endereços");
  }
};

const deleteAddress = async (
  userId: string,
  addressId: string
): Promise<void> => {
  const resAddress = await fetch(`${URL}/${userId}/addresses/${addressId}`);

  if (!resAddress.ok) {
    throw new Error("Erro ao buscar endereço");
  }

  const address: Address = await resAddress.json();

  if (address.userId !== userId) {
    throw new Error("Endereço não pertence ao usuário");
  }

  const resDelete = await fetch(`${URL}/${userId}/addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!resDelete.ok) {
    throw new Error("Erro ao excluir endereço");
  }
};

export { getUser, createUser, updateAddress, deleteAddress };
