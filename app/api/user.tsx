import axios from "axios";
import { User } from "@/lib/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

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
      "Error getting user:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error fetching user");
  }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const { data } = await axios.get<User>(`${process.env.NEXT_PUBLIC_API_URL}/email`, {
      params: { email }, 
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error: any) {
    console.error(
      "Error getting user by email:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error fetching user by email");
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
      "Error saving user:",
      error.response ? error.response.data : error.message
    );
    throw new Error(`Error saving user: ${error}`);
  }
};

export { getUser, getUserByEmail, createUser };
