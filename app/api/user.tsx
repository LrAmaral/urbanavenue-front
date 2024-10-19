import axios from "axios";
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
  try {
    const { data } = await axios.get<User>(`${URL}/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    console.error(
      "Error deleting address:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error fetching user");
  }
};

const createUser = async (userData: User): Promise<User> => {
  try {
    const { data } = await axios.post<User>(URL, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    console.error(
      "Error deleting address:",
      error.response ? error.response.data : error.message
    );
    throw new Error(`Error saving user: ${error}`);
  }
};

const updateAddress = async (
  userId?: string,
  addresses?: Address
): Promise<void> => {
  try {
    await axios.patch(
      `${URL}/${userId}`,
      { addresses },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error(
      "Error deleting address:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error updating addresses");
  }
};

const deleteAddress = async (
  userId: string,
  addressId: string
): Promise<void> => {
  try {
    await axios.delete(`${URL}/${userId}/addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(
      "Error deleting address:",
      error.response ? error.response.data : error.message
    );
    throw new Error(`Error deleting address: ${error}`);
  }
};

export { getUser, createUser, updateAddress, deleteAddress };
