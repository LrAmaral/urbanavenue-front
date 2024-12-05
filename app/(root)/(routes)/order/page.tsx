"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useCart } from "@/providers/cart-context";
import Image from "next/image";
import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/Custom/wrapper";
import { createOrder } from "@/app/api/order";
import toast from "react-hot-toast";
import AddressForm from "../address/components/address-form";
import { Address } from "@/lib/types";
import { createUser } from "@/app/api/user";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

interface ShippingOption {
  type: string;
  value: string;
  deliveryTime: string;
  code: string;
}

export default function OrdersPage(): JSX.Element {
  const {
    cartItems,
    total,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
  } = useCart();
  const hasItems = cartItems.length > 0;

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(
    null
  );
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const { user } = useUser();

  const createAddressForOrder = async (newAddress: Address) => {
    try {
      if (!user) {
        toast.error("User not authenticated.");
        return;
      }

      const userData = {
        name: user.firstName || "N/A",
        email: user.emailAddresses[0]?.emailAddress || "N/A",
        role: "CLIENT",
        addresses: [...addresses, newAddress],
      };

      const createdUser = await createUser(userData);

      const userId = createdUser.addresses[0]?.userId;
      const addressId =
        createdUser.addresses[createdUser.addresses.length - 1]?.id;

      if (!userId || !addressId) {
        throw new Error("Failed to retrieve userId or addressId from backend.");
      }

      const addressWithId: Address = {
        ...newAddress,
        id: addressId,
        userId: userId,
      };

      const updatedAddresses = [...addresses, addressWithId];
      setAddresses(updatedAddresses);

      localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
      setSelectedAddress(addressWithId);

      toast.success("Address added successfully!");
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error(
        `Error adding address: ${
          axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : "Unexpected error occurred."
        }`
      );
    }
  };

  const formatCurrency = (value: number): string => {
    return value.toFixed(2).replace(".", ",");
  };

  const randomVariation = (baseValue: number, percentage: number): number => {
    const variation = Math.random() * (percentage * 2) - percentage;
    return baseValue + baseValue * variation;
  };

  const simulateShipping = useCallback((zipCode: string): ShippingOption[] => {
    const prefix = zipCode.substring(0, 2);

    const increments: { [key: string]: number } = {
      "14": 10,
      "15": 20,
      "16": 15,
      "17": 25,
    };

    const baseValue = 30;
    const increment = increments[prefix] || 0;

    const baseFinalValue = baseValue + increment;

    const standardValue = formatCurrency(baseFinalValue);
    const expressValue = formatCurrency(baseFinalValue + 15);

    return [
      {
        type: "Standard Shipping",
        value: standardValue,
        deliveryTime: "5",
        code: "04014",
      },
      {
        type: "Express Shipping",
        value: expressValue,
        deliveryTime: "2",
        code: "04065",
      },
    ];
  }, []);

  useEffect(() => {
    const savedAddresses = localStorage.getItem("userAddresses");
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }

    const savedSelectedAddress = localStorage.getItem("selectedAddress");
    if (savedSelectedAddress) {
      const parsedAddress = JSON.parse(savedSelectedAddress);
      setSelectedAddress(parsedAddress);
      const options = simulateShipping(parsedAddress.zipCode);
      setShippingOptions(options);
      setSelectedOption(options[0]);
    }
  }, [simulateShipping]);

  const handleAddressChange = (address: Address) => {
    setSelectedAddress(address);
    const options = simulateShipping(address.zipCode);
    setShippingOptions(options);
    setSelectedOption(options[0]);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
    toast.success("Address updated successfully!");
  };

  const handleAddAddress = async (newAddress: Address) => {
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    await createAddressForOrder(newAddress);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
    setIsAddingAddress(false);
    toast.success("Address added successfully!");
  };

  const handlePlaceOrder = async () => {
    if (!selectedOption) {
      toast.error("Please select a shipping option before proceeding.");
      return;
    }

    try {
      await createOrder(
        cartItems,
        total + parseFloat(selectedOption.value.replace(",", "."))
      );
      toast.success("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Error placing the order:", error);
      toast.error(
        "An error occurred while placing the order. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Wrapper className="mt-24 md:mt-32 lg:mt-40">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

        {hasItems ? (
          <div className="flex flex-col md:flex-row justify-between items-start md:space-x-8 w-full">
            <div className="space-y-4 w-full md:w-2/3">
              {cartItems.map((item) => (
                <div
                  key={`${item.size}`}
                  className="flex flex-col md:flex-row justify-between items-center p-4 border rounded-md space-y-4 md:space-y-0"
                >
                  <div className="flex items-center gap-2 w-full">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <div>
                      <p className="text-lg font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Size: {item.size.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between md:justify-end w-full space-x-4 mt-2 md:mt-0">
                    <div className="flex items-center space-x-2">
                      {item.quantity > 1 ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateItemQuantity(
                              item.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus size={16} />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItemFromCart(item.id, item.size)}
                        >
                          <Trash size={16} />
                        </Button>
                      )}
                      <span className="text-md font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateItemQuantity(
                            item.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    <p className="text-lg font-medium mt-2 md:mt-0">
                      R${" "}
                      {(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col w-full md:w-1/3 border p-4 rounded-lg space-y-4 mt-8 md:mt-0">
              <h2 className="text-lg font-semibold">Selected Address</h2>
              {selectedAddress ? (
                <div className="w-full p-4 border rounded-md bg-zinc-100">
                  <p>
                    {selectedAddress.street}, {selectedAddress.neighborhood}
                  </p>
                  <p>
                    {selectedAddress.city}, {selectedAddress.state}
                  </p>
                  <p>{selectedAddress.zipCode}</p>
                  <button
                    onClick={() => setSelectedAddress(null)}
                    className="mt-2 text-zinc-600"
                  >
                    Change Address
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  {addresses.map((address, index) => (
                    <div
                      key={address.id || index}
                      className="p-4 border rounded-md mb-2 cursor-pointer"
                      onClick={() => handleAddressChange(address)}
                    >
                      <p>
                        {address.street}, {address.neighborhood}
                      </p>
                      <p>
                        {address.city}, {address.state}
                      </p>
                      <p>{address.zipCode}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="text-zinc-600"
                  >
                    Add New Address
                  </button>
                </div>
              )}

              {isAddingAddress && (
                <AddressForm
                  addresses={addresses}
                  setAddresses={async (updatedAddress) => {
                    await createAddressForOrder(updatedAddress);
                  }}
                  onSubmit={handleAddAddress}
                />
              )}

              {shippingOptions.length > 0 && (
                <div className="w-full">
                  <h3 className="text-lg font-semibold mb-2">
                    Select a Shipping Option
                  </h3>
                  {shippingOptions.map((option) => (
                    <div
                      key={option.code}
                      className={`flex justify-between items-center border p-2 rounded-md mb-2 cursor-pointer ${
                        selectedOption?.code === option.code
                          ? "bg-zinc-100"
                          : "bg-white"
                      }`}
                      onClick={() => setSelectedOption(option)}
                    >
                      <div>
                        <p className="font-medium">{option.type}</p>
                        <p className="text-sm text-gray-600">
                          {option.deliveryTime} business days
                        </p>
                      </div>
                      <p className="font-bold">R$ {option.value}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center font-semibold text-xl w-full">
                <p>Subtotal:</p>
                <p>
                  R${" "}
                  {(
                    total +
                    (selectedOption
                      ? parseFloat(selectedOption.value.replace(",", "."))
                      : 0)
                  )
                    .toFixed(2)
                    .replace(".", ",")}
                </p>
              </div>

              <Button
                className="w-full bg-zinc-900 text-white py-3 font-bold rounded-lg hover:bg-zinc-800 transition-colors ease-in-out mt-6"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your order list is empty.</p>
        )}
      </Wrapper>
    </div>
  );
}
