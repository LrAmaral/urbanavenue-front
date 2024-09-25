"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { MapPin } from "lucide-react";
import { Wrapper } from "@/components/Custom/wrapper";
import AddressForm from "../user/components/AddressForm";

const AddressPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleAddressChange = (newAddresses: Address[]) => {
    setAddresses(newAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(newAddresses));
    setIsEditing(false);
  };

  return (
    <div className="w-full h-auto md:h-screen mt-24 flex flex-col items-center justify-start">
      <Wrapper className="w-full flex flex-col space-y-6">
        <div className="bg-white w-full md:w-2/3 rounded-lg p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Address</h2>
            {addresses.length > 0 && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Add address
              </button>
            )}
          </div>
          {addresses.length > 0 && !isEditing ? (
            <div className="text-gray-700">
              {addresses.slice(0, 5).map((addr, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-lg mb-4"
                >
                  <p className="font-medium">{addr.fullName}</p>
                  <p>{addr.street}</p>
                  <p>
                    {addr.city}, {addr.state} {addr.zipCode}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <AddressForm
              addresses={addresses}
              setAddresses={handleAddressChange}
            />
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default AddressPage;
