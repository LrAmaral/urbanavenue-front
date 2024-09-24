"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrdersHistory from "./components/OrdersHistory";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Wrapper } from "@/components/Custom/wrapper";
import { Mail, User as UserIcon, MapPin, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const UserProfile = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const { user } = useUser();
  const router = useRouter();

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
              <span className="">{user?.firstName || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-gray-500" />
              <span className="">
                {user?.emailAddresses[0]?.emailAddress || "N/A"}
              </span>
            </div>
            <Separator />
            {addresses.length > 0 ? (
              <div className="space-y-4">
                <div className="flex gap-2 items-center justify-between">
                  <p className="text-xl font-semibold text-gray-800">
                    My address
                  </p>
                  <button
                    onClick={handleAddAddress}
                    className="hover:text-zinc-900"
                  >
                    {addresses.length > 0
                      ? "Edit Address"
                      : "Register new address"}
                  </button>
                </div>
                {addresses.slice(0, 2).map((addr, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectAddress(addr)}
                    className={`cursor-pointer border p-4 mb-2 rounded-lg flex justify-between items-center ${
                      selectedAddress === addr
                        ? "bg-gray-200 border-gray-400"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <MapPin className="w-6 h-6 text-gray-500" />
                        <span className="">
                          {selectedAddress === addr
                            ? "Selected Address"
                            : "Address"}
                        </span>
                      </div>
                      <p className="font-medium">{addr.fullName}</p>
                      <p>{addr.street}</p>
                      <p>
                        {addr.city}, {addr.state} {addr.zipCode}
                      </p>
                    </div>
                    {selectedAddress === addr && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Nenhum endereço cadastrado.</p>
            )}

            {addresses.length < 2 && (
              <button
                onClick={handleAddAddress}
                className="mt-4 px-4 py-2 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-900"
              >
                Register new address
              </button>
            )}
          </div>
        </div>
        <OrdersHistory />
      </Wrapper>
    </div>
  );
};

export default UserProfile;
