"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Wrapper } from "@/components/Custom/wrapper";
import { Mail, User as UserIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import OrdersHistory from "./components/order-history";
import { useRouter } from "next/navigation";

interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const UserProfile = () => {
  const { user } = useUser();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    const address = localStorage.getItem("selectedAddress");
    if (address) {
      setSelectedAddress(JSON.parse(address));
    }
  }, []);

  const handleAddAddress = () => {
    router.push("/address");
  };

  return (
    <div className="w-full h-auto md:h-1/2 mt-24 flex flex-col items-center justify-start">
      <Wrapper className="flex flex-col w-full md:flex-row space-y-6">
        <div className="w-full md:w-1/3 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">My account</h2>
          </div>
          <div className="flex flex-col space-y-4 text-gray-700">
            <div className="flex items-center space-x-3">
              <UserIcon className="w-6 h-6 text-gray-500" />
              <span>{user?.firstName || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-gray-500" />
              <span>{user?.emailAddresses[0]?.emailAddress || "N/A"}</span>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-xl font-semibold text-gray-800">
                  My address
                </p>
                <button
                  onClick={handleAddAddress}
                  className="hover:text-zinc-900"
                >
                  {selectedAddress ? "Edit Address" : "Add New Address"}
                </button>
              </div>
              {selectedAddress ? (
                <div className="bg-white p-4 rounded-lg border">
                  <h2 className="font-medium">{selectedAddress.fullName}</h2>
                  <p>{selectedAddress.street}</p>
                  <p>
                    {selectedAddress.city}, {selectedAddress.state}{" "}
                    {selectedAddress.zipCode}
                  </p>
                </div>
              ) : (
                <p>No address selected.</p>
              )}
            </div>
          </div>
        </div>
        <OrdersHistory />
      </Wrapper>
    </div>
  );
};

export default UserProfile;
