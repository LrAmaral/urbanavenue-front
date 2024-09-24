"use client";

import { useEffect, useState } from "react";
import OrdersHistory from "./components/OrdersHistory";
import { UserButton, useUser } from "@clerk/nextjs";
import AddressForm from "./components/AddressForm";
import { Wrapper } from "@/components/Custom/wrapper";

const UserProfile = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
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
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="w-full h-auto md:h-screen mt-24 flex flex-col items-center justify-start">
      <Wrapper>
        <div className="w-full max-w-[76.875rem] mx-auto xs:px-6 px-8 flex flex-col space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My account</h2>
              <UserButton afterSignOutUrl="/" />
            </div>
            <div className="mt-4">
              <p>
                <strong>Name:</strong> {user?.firstName || "N/A"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {user?.emailAddresses[0]?.emailAddress || "N/A"}
              </p>
              {addresses.length > 0 && (
                <div>
                  <strong>Address Info:</strong>
                  {addresses.map((addr, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectAddress(addr)}
                      className={`cursor-pointer p-2 ${selectedAddress === addr ? "bg-gray-200" : ""}`}
                    >
                      <p>{addr.fullName}</p>
                      <p>{addr.street}</p>
                      <p>
                        {addr.city}, {addr.state} {addr.zipCode}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <AddressForm
              addresses={addresses}
              setAddresses={handleAddressChange}
            />
            <OrdersHistory />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default UserProfile;
