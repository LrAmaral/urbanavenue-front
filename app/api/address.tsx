import axios from "axios";
import { Address, AddressResponse } from "@/lib/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/address`;

const getAddresses = async (userId: string): Promise<AddressResponse> => {
  try {
    const { data } = await axios.get<AddressResponse>(`${URL}/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    console.error(
      "Error getting addresses:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error fetching addresses");
  }
};

const updateAddress = async (
  userId: string,
  addresses: Address[]
): Promise<void> => {
  if (!userId) {
    throw new Error("User ID is required for updating addresses.");
  }

  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
      { addresses },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error: any) {
    console.error(
      "Error updating addresses:",
      error.response?.data || error.message
    );
    throw new Error("Error updating addresses");
  }
};

export { getAddresses, updateAddress };
