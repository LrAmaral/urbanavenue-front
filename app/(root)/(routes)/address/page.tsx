"use client";

import { useEffect, useState, useCallback } from "react";
import { Wrapper } from "@/components/Custom/wrapper";
import AddressForm from "../user/components/address-form";
import { ArrowLeft, Edit, Trash2, CheckCircle, Plus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { createUser, deleteAddress, updateAddress, getUser } from "@/app/api/user";
import { Address } from "@/lib/address";

const AddressPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);
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

  const handleAddressChange = async (newAddress: Address) => {
    const updatedAddresses = editIndex !== null
      ? addresses.map((addr, index) => (index === editIndex ? newAddress : addr))
      : [...addresses, { ...newAddress, id: new Date().toISOString() }];

    if (updatedAddresses.length <= 5) {
      setAddresses(updatedAddresses);
      localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
      toast.success("Address saved successfully!");

      if (user) {
        const userData = {
          id: user.id,
          name: user.firstName || "N/A",
          email: user.emailAddresses[0]?.emailAddress || "N/A",
          role: "CLIENT",
          addresses: updatedAddresses,
        };
        await createUser(userData).catch((error) => {
          console.error("Error saving user data:", error);
          toast.error("Error saving user data.");
        });
      }
    } else {
      toast.error("You have already registered the maximum of 5 addresses.");
    }

    setEditIndex(null);
    setIsEditing(false);
  };

  const handleEditAddress = (index: number) => {
    setEditIndex(index);
    setIsEditing(true);
  };

  const handleDeleteAddress = async (index: number) => {
    const addressToDelete = addresses[index];
    const updatedAddresses = addresses.filter((_, addrIndex) => addrIndex !== index);
    setAddresses(updatedAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
    toast.success("Address deleted successfully!");

    if (user) {
      await deleteAddress(user.id, addressToDelete.id!).catch((error) => {
        console.error("Error deleting address:", error);
        toast.error("Error deleting address.");
      });
    }
  };

  const handleSelectAddress = (index: number) => {
    setSelectedAddressIndex(index);
    localStorage.setItem("selectedAddress", JSON.stringify(addresses[index]));
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="w-full h-auto md:h-1/2 mt-24 flex flex-col items-center justify-start">
      <Wrapper className="w-full flex flex-col space-y-6">
        <div className="bg-white w-full md:w-2/3 rounded-lg p-4">
          <div className="flex justify-between items-center mb-6">
            <button onClick={handleBack} className="flex items-center text-zinc-500 hover:text-zinc-700 font-semibold">
              <ArrowLeft className="mr-2" />
              Back to Home
            </button>
            {addresses.length < 5 && (
              <button onClick={() => setIsEditing(true)} className="text-zinc-500 hover:text-zinc-700 font-semibold">
                Add address
              </button>
            )}
          </div>
          <div className="text-gray-700">
            {!isEditing ? (
              addresses.map((addr, index) => (
                <div key={index} className="p-4 border border-gray-300 rounded-lg mb-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{addr.fullName}</p>
                    <p>{addr.street}</p>
                    <p>{`${addr.city}, ${addr.state} ${addr.zipCode}`}</p>
                  </div>
                  {selectedAddressIndex === index && (
                    <p className="text-zinc-500">
                      <CheckCircle className="inline mr-1" /> Address Selected
                    </p>
                  )}
                  <div className="flex space-x-2">
                    <button onClick={() => handleSelectAddress(index)} className="text-zinc-500 hover:underline">
                      <Plus />
                    </button>
                    <button onClick={() => handleEditAddress(index)} className="text-zinc-500 hover:underline flex items-center">
                      <Edit className="mr-1" /> Edit
                    </button>
                    <button onClick={() => handleDeleteAddress(index)} className="text-zinc-500 hover:underline flex items-center">
                      <Trash2 className="mr-1" /> Delete
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
