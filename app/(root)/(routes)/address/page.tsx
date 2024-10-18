"use client";

import { useEffect, useState, useCallback } from "react";
import { Wrapper } from "@/components/Custom/wrapper";
import AddressForm from "../user/components/address-form";
import { ArrowLeft } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { createUser, deleteAddress, updateAddress } from "@/app/api/user";
import { Address } from "@/lib/address";

const AddressPage = () => {
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
      console.log(addresses);
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
      console.error("Error creating address:", error);
      toast.error("Error creating address. Please try again.");
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
      console.error("Error updating address:", error);
      toast.error("Error updating address. Please try again.");
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
    console.log(addresses.find((addr) => addr.id === id));
    const addressToDelete = addresses.find((addr) => addr.id === id);
    if (!addressToDelete) return;

    console.log(addressToDelete);
    
    const updatedAddresses = addresses.filter(
      (addr) => addr.id !== addressToDelete.id
    );

    console.log(updatedAddresses);
    setAddresses(updatedAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
    toast.success("Address deleted successfully!");

    const userId = addressToDelete.userId;

    if (userId && addressToDelete.id) {
      try {
        await deleteAddress(userId, addressToDelete.id);
      } catch (error) {
        console.error("Error deleting address:", error);
        toast.error("Error deleting address.");
      }
    } else {
      console.error("User ID or Address ID is undefined.");
    }
  };

  return (
    <div className="w-full h-auto md:h-1/2 mt-24 flex flex-col items-center justify-start">
      <Wrapper className="w-full flex flex-col space-y-6">
        <div className="bg-white w-full rounded-lg p-4">
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
                Add Address
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
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditAddress(index)}
                      className="text-zinc-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (addr.id) {
                          handleDeleteAddress(addr.id);
                        } else {
                          console.error("Address ID is undefined");
                        }
                      }}
                      className="text-zinc-500 hover:underline"
                    >
                      Delete
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
