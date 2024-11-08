"use client";

import { useEffect, useState, useCallback } from "react";
import { Wrapper } from "@/components/Custom/wrapper";
import AddressForm from "./components/address-form";
import { ArrowLeft } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { createUser, deleteAddress, updateAddress } from "@/app/api/user";
import { Address } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Check, Edit, Trash2 } from "lucide-react";

const AddressPage = () => {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { user } = useUser();

  const loadAddresses = useCallback(() => {
    const savedAddresses = localStorage.getItem("userAddresses");
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const saveSelectedAddress = (address: Address) => {
    localStorage.setItem("selectedAddress", JSON.stringify(address));
    toast.success("Address selected successfully!");
    router.push("/user");
  };

  const createAddress = async (newAddress: Address) => {
    try {
      if (!user) return;

      const userData = {
        name: user.firstName || "N/A",
        email: user.emailAddresses[0]?.emailAddress || "N/A",
        role: "CLIENT",
        addresses: [...addresses, newAddress],
      };

      const createdUser = await createUser(userData);
      const userId = createdUser.addresses[0].userId;
      const addressId =
        createdUser.addresses[createdUser.addresses.length - 1].id;

      const addressWithId: Address = {
        ...newAddress,
        id: createdUser.addresses[createdUser.addresses.length - 1]?.id,
        userId: userId,
      };

      const updatedAddresses = [...addresses, addressWithId];

      setAddresses(updatedAddresses);
      localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
      toast.success("Address created successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error creating address:",
          error.response?.data || error.message
        );
        toast.error(
          `Error creating address: ${error.response?.data?.message || error.message}`
        );
      } else {
        console.error("Error creating address:", error);
        toast.error("Error creating address.");
      }
    }
  };

  const updateExistingAddress = async (index: number, newAddress: Address) => {
    if (!user) return;

    const userId = addresses[index]?.userId;
    const addressId = addresses[index]?.id;

    try {
      await updateAddress(userId, { ...newAddress, id: addressId });
      const updatedAddresses = [...addresses];
      updatedAddresses[index] = { ...newAddress, id: addressId };
      setAddresses(updatedAddresses);
      localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
      toast.success("Address updated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error updating address:",
          error.response?.data || error.message
        );
        toast.error(
          `Error updating address: ${error.response?.data?.message || error.message}`
        );
      } else {
        console.error("Error updating address:", error);
        toast.error("Error updating address.");
      }
    }
  };

  const handleAddressChange = async (newAddress: Address) => {
    if (editIndex !== null) {
      await updateExistingAddress(editIndex, newAddress);
    } else {
      await createAddress(newAddress);
    }
    setEditIndex(null);
    setIsEditing(false);
  };

  const handleEditAddress = (index: number) => {
    setEditIndex(index);
    setIsEditing(true);
  };

  const handleDeleteAddress = async (id: string) => {
    const addressToDelete = addresses.find((addr) => addr.id === id);
    if (!addressToDelete) {
      console.error("Address not found.");
      return;
    }

    const userId = addressToDelete.userId;
    if (userId && addressToDelete.id) {
      try {
        await deleteAddress(userId, addressToDelete.id);

        const updatedAddresses = addresses.filter((addr) => addr.id !== id);
        setAddresses(updatedAddresses);

        localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));

        toast.success("Address deleted successfully!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error deleting address:",
            error.response?.data || error.message
          );
          toast.error(
            `Error deleting address: ${error.response?.data?.message || error.message}`
          );
        } else {
          console.error("Error deleting address:", error);
          toast.error("Error deleting address.");
        }
      }
    } else {
      console.error("User ID or Address ID is undefined.");
    }
  };

  return (
    <div className="w-full h-auto md:h-1/2 mt-24 flex flex-col items-center justify-start">
      <Wrapper className="w-full flex flex-col space-y-6">
        <div className="bg-white w-full rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-zinc-500 hover:text-zinc-700 font-semibold"
            >
              <ArrowLeft className="mr-2" />
              Back to Home
            </button>
            {addresses.length < 5 && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-zinc-500 hover:text-zinc-700 font-semibold"
              >
                {!isEditing ? "Add Address" : ""}
              </button>
            )}
          </div>
          <div className="text-gray-700">
            {!isEditing ? (
              addresses.map((addr, index) => (
                <div
                  key={addr.id}
                  className="p-4 border border-gray-300 rounded-lg mb-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{addr.neighborhood}</p>
                    <p>{addr.street}</p>
                    <p>{addr.city}</p>
                    <p>{addr.state}</p>
                    <p>{addr.zipCode}</p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-center space-x-0 space-y-2 md:space-y-0 md:space-x-4 items-center">
                    <button
                      onClick={() => saveSelectedAddress(addr)}
                      className="flex items-center font-semibold rounded transition duration-150 ease-in-out"
                    >
                      <Check size={24} />
                    </button>
                    <button
                      onClick={() => handleEditAddress(index)}
                      className="flex items-center font-semibold rounded transition duration-150 ease-in-out"
                    >
                      <Edit size={24} />
                    </button>
                    <button
                      onClick={() => {
                        if (addr.id) {
                          handleDeleteAddress(addr.id);
                        } else {
                          console.error("Address ID is undefined");
                        }
                      }}
                      className="flex items-center text-red-500 font-semibold rounded transition duration-150 ease-in-out"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <AddressForm
                addresses={addresses}
                setAddresses={handleAddressChange}
                editAddress={editIndex !== null ? addresses[editIndex] : null}
              />
            )}
          </div>
        </div>
      </Wrapper>
      <Toaster />
    </div>
  );
};

export default AddressPage;
