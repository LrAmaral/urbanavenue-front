"use client";

import { useEffect, useState, FormEvent } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Wrapper } from "@/components/Custom/wrapper";
import { LogOut, MapPin, Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import OrdersHistory from "./components/order-history";
import { useRouter } from "next/navigation";
import { Address } from "@/lib/types";
import {
  getUserByEmail,
  getUser,
  updateUser as updateUserApi,
} from "@/app/api/user";
import toast from "react-hot-toast";
import UserInfoSkeleton from "./components/user-info";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UserProfile = () => {
  const { user } = useUser();
  const { isSignedIn } = useUser();
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [cpf, setCpf] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempEmail, setTempEmail] = useState<string>("");
  const [tempFirstname, setTempFirstname] = useState<string>("");
  const [tempLastname, setTempLastname] = useState<string>("");
  const [tempPhoneNumber, setTempPhoneNumber] = useState<string>("");

  const email = user?.emailAddresses[0]?.emailAddress;

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    const digitsOnly = phone.replace(/[^\d]/g, "");
    if (digitsOnly.length > 11) phone = digitsOnly.slice(0, 11);
    return digitsOnly.length === 11;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) {
        return;
      }

      try {
        const userData = await getUserByEmail(email);

        if (!userData) {
          toast.error("User with the given email not found.");
          return;
        }

        const currentClientId = userData.id;

        if (!currentClientId) {
          toast.error("Client ID is missing or invalid.");
          return;
        }

        localStorage.setItem("client_id", currentClientId);

        const fullUserData = await getUser(currentClientId);

        if (fullUserData) {
          setCpf(fullUserData.cpf || null);
          setPhoneNumber(fullUserData.phoneNumber || null);

          if (Array.isArray(fullUserData.addresses)) {
            setAddresses(fullUserData.addresses || []);
          } else {
            setAddresses([]);
          }

          const primaryAddress = fullUserData.addresses.find(
            (addr) => addr.isPrimary === true
          );

          if (primaryAddress) {
            setSelectedAddress(primaryAddress);
          } else {
            setSelectedAddress(null);
          }
        } else {
          toast.error("User data not found.");
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

  const handleUpdateUser = async () => {
    if (!validateEmail(tempEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePhoneNumber(tempPhoneNumber)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    if (user) {
      try {
        localStorage.setItem("showToast", "true");

        await user.update({
          firstName: tempFirstname,
          lastName: tempLastname,
        });

        const userId = localStorage.getItem("client_id");
        if (!userId) {
          toast.error("Client ID not found.");
          return;
        }

        await updateUserApi({
          id: userId,
          name: tempFirstname + " " + tempLastname,
          phoneNumber: tempPhoneNumber,
        });

        setTimeout(() => {
          window.location.reload();
        }, 500);

        setIsModalOpen(false);
      } catch (error) {
        console.error("Error updating user information:", error);
        toast.error("Failed to update user information.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("showToast") === "true") {
      toast.success("User information updated successfully!");
      localStorage.removeItem("showToast");
    }
  }, []);

  const handleAddAddress = () => {
    router.push("/address");
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
            <div className="flex gap-4">
              {!loading ? (
                <button
                  onClick={() => {
                    setTempEmail(user?.emailAddresses[0]?.emailAddress || "");
                    setTempFirstname(user?.firstName || "");
                    setTempLastname(user?.lastName || "");
                    setTempPhoneNumber(phoneNumber || "");
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-2 justify-end text-zinc-600 hover:text-zinc-800"
                >
                  Edit
                </button>
              ) : null}
            </div>
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
                {!loading ? (
                  <button
                    onClick={handleAddAddress}
                    className="hover:text-zinc-900 flex gap-2 items-center"
                  >
                    {selectedAddress ? "Edit" : "Add"}
                  </button>
                ) : null}
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

      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Trigger asChild>
          <button />
        </Dialog.Trigger>
        <Dialog.Content
          aria-describedby="Edit"
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-xl text-zinc-900 font-bold mb-4">
              Edit Personal Info
            </Dialog.Title>
            <form
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                handleUpdateUser();
              }}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block font-semibold">First Name</label>
                  <Input
                    value={tempFirstname}
                    onChange={(e) => setTempFirstname(e.target.value)}
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-semibold">Last Name</label>
                  <Input
                    value={tempLastname}
                    onChange={(e) => setTempLastname(e.target.value)}
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-semibold">Phone Number</label>
                  <Input
                    value={tempPhoneNumber}
                    maxLength={11}
                    onChange={(e) => setTempPhoneNumber(e.target.value)}
                    type="tel"
                    required
                  />
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default UserProfile;
