"use client";

import { useEffect, useState } from "react";
import { Wrapper } from "@/components/Custom/wrapper";
import AddressForm from "../user/components/address-form";
import { ArrowLeft } from "lucide-react";
import createUser from "@/app/api/user";
import { useUser } from "@clerk/nextjs";

interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const AddressPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const savedAddresses = localStorage.getItem("userAddresses");
    if (savedAddresses) {
      try {
        setAddresses(JSON.parse(savedAddresses));
      } catch (error) {
        console.error("Error parsing addresses from localStorage:", error);
      }
    }
  }, []);

  const handleAddressChange = (newAddress: Address) => {
    if (editIndex !== null) {
      const updatedAddresses = addresses.map((addr, index) =>
        index === editIndex ? newAddress : addr
      );
      setAddresses(updatedAddresses);
      localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
      setEditIndex(null);
    } else {
      if (addresses.length < 5) {
        const updatedAddresses = [...addresses, newAddress];
        setAddresses(updatedAddresses);
        localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
      } else {
        alert("Você já cadastrou o máximo de 5 endereços.");
      }
    }
    setIsEditing(false);
  };

  const handleEditAddress = (index: number) => {
    setEditIndex(index);
    setIsEditing(true);
  };

  const handleDeleteAddress = (index: number) => {
    const updatedAddresses = addresses.filter(
      (_, addrIndex) => addrIndex !== index
    );
    setAddresses(updatedAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
  };

  const handleSelectAddress = (index: number) => {
    const selectedAddress = addresses[index];
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    window.location.href = "/user";
  };

  const handleBack = () => {
    window.history.back();
  };

  useEffect(() => {
    if (user && addresses.length > 0) {
      const userData = {
        name: user.firstName || "N/A",
        email: user.emailAddresses[0]?.emailAddress || "N/A",
        role: "CLIENT",
        addresses: addresses,
      };

      createUser(userData).catch((error) =>
        console.error("Erro ao salvar o usuário e endereços:", error)
      );
    }
  }, [user, addresses]);

  return (
    <div className="w-full h-auto md:h-screen mt-24 flex flex-col items-center justify-start">
      <Wrapper className="w-full flex flex-col space-y-6">
        <div className="bg-white w-full md:w-2/3 rounded-lg p-4">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleBack}
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
                Add address
              </button>
            )}
          </div>
          {addresses.length > 0 && !isEditing ? (
            <div className="text-gray-700">
              {addresses.map((addr, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-lg mb-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{addr.fullName}</p>
                    <p>{addr.street}</p>
                    <p>
                      {addr.city}, {addr.state} {addr.zipCode}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSelectAddress(index)}
                      className="text-green-500 hover:underline"
                    >
                      Select
                    </button>
                    <button
                      onClick={() => handleEditAddress(index)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(index)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AddressForm
              addresses={addresses}
              setAddresses={handleAddressChange}
              editAddress={editIndex !== null ? addresses[editIndex] : null}
            />
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default AddressPage;
