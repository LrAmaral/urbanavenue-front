"use client";

import { useEffect, useState, useCallback } from "react";
import { Wrapper } from "@/components/Custom/wrapper";
import AddressForm from "./components/address-form";
import { ArrowLeft, MapPin, Check, Edit } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Address } from "@/lib/types";
import { getAddresses, updateAddress } from "@/app/api/address";
import SkeletonPage from "./components/skeleton-address";

const AddressPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedClientId = localStorage.getItem("client_id");
      setClientId(storedClientId);
    }
  }, []);

  const loadAddresses = useCallback(async () => {
    if (!clientId) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await getAddresses(clientId);
      const allAddresses = response.addresses || [];
      setAddresses(allAddresses);

      const primaryAddress = allAddresses.find((addr) => addr.isPrimary);
      if (primaryAddress) {
        setSelectedAddress(primaryAddress);
        localStorage.setItem(
          `${clientId}_selected_address`,
          JSON.stringify(primaryAddress)
        );
      } else {
        setSelectedAddress(null);
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
      toast.dismiss();
      toast.error("Failed to load addresses.");
    } finally {
      setIsLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    if (clientId) {
      loadAddresses();
    }
  }, [clientId, loadAddresses]);

  const saveSelectedAddress = (address: Address) => {
    if (!clientId) {
      toast.dismiss();
      toast.error("Client ID not found.");
      return;
    }

    localStorage.setItem(
      `${clientId}_selected_address`,
      JSON.stringify(address)
    );
    setSelectedAddress(address);

    const updatedAddresses = addresses.map((addr) =>
      addr.id === address.id
        ? { ...addr, isPrimary: true }
        : { ...addr, isPrimary: false }
    );

    updateAddress(clientId, updatedAddresses);

    toast.dismiss();
    toast.success("Address selected successfully!");
  };

  const handleAddressChange = async (newAddress: Address) => {
    if (!clientId) {
      toast.dismiss();
      toast.error("Client ID not found.");
      return;
    }

    const updatedAddresses =
      editIndex !== null ? [...addresses] : [...addresses, newAddress];

    if (editIndex !== null) {
      updatedAddresses[editIndex] = newAddress;
      setEditIndex(null);
    }

    const updatedAddressesWithPrimary = updatedAddresses.map((addr) =>
      addr.id === newAddress.id
        ? { ...addr, isPrimary: true }
        : { ...addr, isPrimary: false }
    );

    try {
      await updateAddress(clientId, updatedAddressesWithPrimary);
      setAddresses(updatedAddressesWithPrimary);
      localStorage.setItem(
        `${clientId}_user_addresses`,
        JSON.stringify(updatedAddressesWithPrimary)
      );
      toast.success(
        editIndex !== null
          ? "Address updated successfully!"
          : "Address added successfully!"
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update address:", error);
      toast.dismiss();
      toast.error("Failed to save address.");
    }
  };

  const handleEditAddress = (index: number) => {
    setEditIndex(index);
    setIsEditing(true);
  };

  return isLoading ? (
    <SkeletonPage />
  ) : (
    <div className="w-full h-auto mt-24 flex flex-col items-center">
      <Wrapper className="w-full flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-zinc-600 hover:text-zinc-900 font-semibold"
          >
            <ArrowLeft className="mr-2" />
            Back to Home
          </button>
          {addresses.length < 3 && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-zinc-500 hover:text-zinc-700 font-semibold"
            >
              {!isEditing ? "Add Address" : ""}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] w-full gap-4 items-start">
          <div className="bg-white space-y-4 p-4 w-full h-fit border rounded-lg">
            <h2 className="text-lg font-bold text-zinc-800 mb-4">
              Selected Address
            </h2>
            <span className="flex gap-4 text-zinc-900 items-center">
              <MapPin /> Main Location
            </span>
            {selectedAddress ? (
              <div>
                <p className="font-medium text-zinc-700">
                  {selectedAddress.neighborhood}
                </p>
                <p className="text-zinc-700">{selectedAddress.street}</p>
                <p className="text-zinc-700">{selectedAddress.city}</p>
                <p className="text-zinc-700">{selectedAddress.state}</p>
                <p className="text-zinc-700">{selectedAddress.zipCode}</p>
                <p className="text-zinc-700">{selectedAddress.number}</p>
              </div>
            ) : (
              <p className="text-zinc-500">No address selected.</p>
            )}
          </div>

          <div className="bg-white p-4 border w-full rounded-lg">
            <h2 className="text-lg font-bold text-zinc-800 mb-4">
              Available Addresses
            </h2>
            {!isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className="p-2 border border-gray-300 rounded-lg flex flex-col justify-between items-start"
                  >
                    <div className="mb-1">
                      <p className="font-medium text-zinc-700">
                        {addr.neighborhood}
                      </p>
                      <p className="text-zinc-700">{addr.street}</p>
                      <p className="text-zinc-700">{addr.city}</p>
                      <p className="text-zinc-700">{addr.state}</p>
                      <p className="text-zinc-700">{addr.zipCode}</p>
                      <p className="text-zinc-700">{addr.number}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => saveSelectedAddress(addr)}
                        className="flex items-center font-semibold rounded text-zinc-800 transition duration-150 ease-in-out"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={() => handleEditAddress(idx)}
                        className="flex items-center font-semibold rounded text-zinc-800 transition duration-150 ease-in-out"
                      >
                        <Edit size={20} />
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
        </div>
      </Wrapper>
      <Toaster />
    </div>
  );
};

export default AddressPage;
