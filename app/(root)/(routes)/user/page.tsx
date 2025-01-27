"use client";

import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Wrapper } from "@/components/Custom/wrapper";
import { LogOut, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import OrdersHistory from "./components/order-history";
import { useRouter } from "next/navigation";
import { Address, User } from "@/lib/types";
import UserInfoSkeleton from "@/components/user-info";
import { getUserByEmail, getUser } from "@/app/api/user";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { user } = useUser();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [cpf, setCpf] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const email = user?.emailAddresses[0]?.emailAddress;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!email === undefined) {
        return;
      }

      if (!email) {
        return;
      }

      try {
        let userData = await getUserByEmail(email);

        if (userData) {
          const currentClientId = userData.id;

          if (!currentClientId) {
            return;
          }

          localStorage.setItem("client_id", currentClientId);

          if (currentClientId) {
            const fullUserData = await getUser(currentClientId);

            if (fullUserData) {
              setCpf(fullUserData.cpf || null);
              setPhoneNumber(fullUserData.phoneNumber || null);

              if (Array.isArray(fullUserData.addresses)) {
                setAddresses(fullUserData.addresses || []);
              } else {
                setAddresses([]);
              }

              const storedSelectedAddress = localStorage.getItem(
                `${currentClientId}_selected_address`
              );

              if (storedSelectedAddress) {
                setSelectedAddress(JSON.parse(storedSelectedAddress));
              } else if (
                fullUserData.addresses &&
                fullUserData.addresses.length > 0
              ) {
                setSelectedAddress(fullUserData.addresses[0]);
              }
            } else {
              toast.error("User data not found.");
            }
          } else {
            toast.error("Client ID is missing or invalid.");
          }
        } else {
          toast.error("User with the given email not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.dismiss();
        toast.error("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

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
            <UserInfoSkeleton
              user={user}
              loading={!user || loading}
              cpf={cpf}
              phoneNumber={phoneNumber}
            />
            <Separator />
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <p className="text-xl font-semibold text-gray-800">
                  My addresses
                </p>
                <button
                  onClick={handleAddAddress}
                  className="hover:text-zinc-900"
                >
                  {selectedAddress ? "Edit" : "Add"}
                </button>
              </div>
              {loading ? (
                <div className="bg-white p-1 rounded-lg animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                  <div className="h-2 bg-gray-200 rounded mb-2 w-full"></div>
                </div>
              ) : selectedAddress ? (
                <>
                  <span className="flex gap-4 text-zinc-900">
                    <MapPin /> Main Location
                  </span>
                  <div className="bg-white px-2">
                    <h2 className="text-xl font-bold mb-2">
                      {selectedAddress.fullName}
                    </h2>
                    <p className="mb-1 text-gray-700">
                      {selectedAddress.street}, {selectedAddress.number}
                    </p>
                    <p className="mb-1 text-gray-700">
                      {selectedAddress.neighborhood} {selectedAddress.city},{" "}
                      {selectedAddress.zipCode}
                    </p>
                    <p className="text-gray-600">{selectedAddress.state}</p>
                  </div>
                </>
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
