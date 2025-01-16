"use client";

import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Wrapper } from "@/components/Custom/wrapper";
import { Mail, User as UserIcon, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import OrdersHistory from "./components/order-history";
import { useRouter } from "next/navigation";

interface Address {
  userId: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const UserProfile = () => {
  const { user } = useUser();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      const savedAddress = localStorage.getItem(`${user.id}_selectedAddress`);

      if (savedAddress) {
        const address = JSON.parse(savedAddress);
        setSelectedAddress(address);
      }
      setLoading(false);
    }
  }, [user?.id]);

  const handleAddAddress = () => {
    router.push("/address");
  };

  const handleSignOut = () => {
    signOut();
    router.push("/sign-in");
  };

  useEffect(() => {
    if (isSignedIn === false) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  return (
    <div className="w-full h-auto md:h-1/2 mt-24 flex flex-col items-center justify-start">
      <Wrapper className="flex flex-col w-full md:flex-row space-y-6">
        <div className="w-full md:w-1/3 py-6 md:px-0 px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">My account</h2>
            <button
              onClick={handleSignOut}
              className="text-black hover:text-gray-700"
            >
              <LogOut className="w-6 h-6" />
            </button>
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
              {loading ? (
                <div className="bg-white p-1 rounded-lg animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                  <div className="h-2 bg-gray-200 rounded mb-2 w-full"></div>
                </div>
              ) : selectedAddress ? (
                <div className="bg-white">
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
