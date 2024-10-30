"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Wrapper } from "@/components/Custom/wrapper";
import { Mail, MapPin, User as UserIcon } from "lucide-react";
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
              <div className="flex justify-between border-b pb-2">
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
                <div className="bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="text-zinc-500" />
                    <p className="font-semibold text-lg">Main</p>
                  </div>
                  <h2 className="text-xl font-bold mb-2">
                    {selectedAddress.fullName}
                  </h2>
                  <p className="mb-1 text-gray-700">{selectedAddress.street}</p>
                  <p className="text-gray-600">
                    {selectedAddress.city}, {selectedAddress.state}{" "}
                    {selectedAddress.zipCode}
                  </p>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-500">No address selected.</p>
                </div>
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
