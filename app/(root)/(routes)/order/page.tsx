"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useCart } from "@/providers/cart-context";
import Image from "next/image";
import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/Custom/wrapper";
import AddressForm from "../address/components/address-form";
import { Address, Size } from "@/lib/types";
import { createAddress, getAddresses } from "@/app/api/address";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ShippingOption {
  type: string;
  value: string;
  deliveryTime: string;
  code: string;
}

export default function OrdersPage(): JSX.Element {
  const { cartItems, total, removeItemFromCart, updateItemQuantity } =
    useCart();
  const hasItems = cartItems.length > 0;
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(
    null
  );
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [showAddressList, setShowAddressList] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    const storedClientId = localStorage.getItem("client_id");
    if (storedClientId) setClientId(storedClientId);
  }, []);

  const formatCurrency = (value: number): string => {
    return value.toFixed(2).replace(".", ",");
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

  const loadAddresses = useCallback(async () => {
    if (!clientId) {
      toast.dismiss();
      toast.error("Client ID not found.");
      return;
    }

    try {
      const response = await getAddresses(clientId);
      setAddresses(response.addresses || []);

      const savedSelectedAddress = localStorage.getItem(
        `${clientId}_selected_address`
      );
      if (savedSelectedAddress) {
        const parsedAddress = JSON.parse(savedSelectedAddress);
        setSelectedAddress(parsedAddress);
        const options = simulateShipping(parsedAddress.zipCode);
        setShippingOptions(options);
        setSelectedOption(options[0]);
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
      toast.dismiss();
      toast.error("Failed to load addresses.");
    }
  }, [simulateShipping, clientId]);

  useEffect(() => {
    if (clientId) {
      loadAddresses();
    }
  }, [loadAddresses, clientId]);

  const handleAddressChange = (address: Address) => {
    setSelectedAddress(address);
    const options = simulateShipping(address.zipCode);
    setShippingOptions(options);
    setSelectedOption(options[0]);
    localStorage.setItem(
      `${clientId}_selected_address`,
      JSON.stringify(address)
    );
    setShowAddressList(false);
    toast.success("Address updated successfully!");
  };

  const createAddressForOrder = async (newAddress: Address) => {
    try {
      if (!clientId) {
        toast.error("Client ID not found.");
        return;
      }

      const createdAddress = await createAddress(clientId, newAddress);

      const updatedAddresses = [...addresses, createdAddress];
      setAddresses(updatedAddresses);

      setIsAddingAddress(false);
      toast.success("Address added successfully! Please select it.");
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address.");
    }
  };

  const handleAddAddress = async (newAddress: Address) => {
    if (!clientId) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      console.log(newAddress);
      const createdAddress = await createAddress(clientId, newAddress);

      const updatedAddresses = [...addresses, createdAddress];
      setAddresses(updatedAddresses);

      setIsAddingAddress(false);
      toast.success("Address added successfully!");
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedOption || !selectedAddress) {
      toast.error("Please select an address and shipping option.");
      return;
    }

    try {
      const orderDetails = {
        cartItems,
        total: total + parseFloat(selectedOption.value.replace(",", ".")),
        shippingOption: selectedOption,
        selectedAddress,
      };

      localStorage.setItem(
        `${clientId}_orderDetails`,
        JSON.stringify(orderDetails)
      );

      toast.success("Proceeding to payment...");
      router.push("/payment");
    } catch (error) {
      console.error("Error preparing order for payment:", error);
      toast.error("An error occurred while preparing for payment.");
    }
  };

  const handleQuantityChange = (
    itemId: string,
    size: Size,
    quantity: number
  ) => {
    const maxQuantity = 5;

    if (quantity > maxQuantity) {
      toast.dismiss();
      toast(`You can only purchase up to ${maxQuantity} of this item.`);
      return;
    }

    updateItemQuantity(itemId, size, quantity);
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
                  key={`${item.id}-${item.size.name}`}
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
                          onClick={() => {
                            handleQuantityChange(
                              item.id,
                              item.size,
                              item.quantity - 1
                            );
                          }}
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
                        onClick={() => {
                          handleQuantityChange(
                            item.id,
                            item.size,
                            item.quantity + 1
                          );
                        }}
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
            <div className="space-y-4 w-full md:w-1/3">
              {showAddressList || !selectedAddress ? (
                <div className="w-full max-w-lg my-4 md:my-0">
                  <h2 className="text-lg font-semibold mb-2">Select Address</h2>
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`p-4 border rounded-md mb-2 cursor-pointer ${
                        selectedAddress?.id === address.id
                          ? "bg-zinc-100"
                          : "bg-white"
                      }`}
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
                  {addresses.length < 3 && (
                    <Button
                      onClick={() => setIsAddingAddress(true)}
                      className="w-full mt-4"
                    >
                      Add Address
                    </Button>
                  )}
                  {isAddingAddress && (
                    <div className="mt-4">
                      <AddressForm
                        addresses={addresses}
                        setAddresses={async (updatedAddress) => {
                          await createAddressForOrder(updatedAddress);
                          setIsAddingAddress(false);
                        }}
                        onSubmit={handleAddAddress}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-auto max-w-lg p-4 my-4 md:my-0 border rounded-md bg-zinc-100">
                  <h2 className="text-lg font-semibold mb-2">
                    Selected Address
                  </h2>
                  <div className="space-y-2">
                    <p>
                      {selectedAddress.street}, {selectedAddress.neighborhood}
                    </p>
                    <p>
                      {selectedAddress.city}, {selectedAddress.state}
                    </p>
                    <p>{selectedAddress.zipCode}</p>
                  </div>
                  <Button
                    onClick={() => {
                      setShowAddressList(true);
                      setIsAddingAddress(false);
                    }}
                    className="mt-4 w-full"
                  >
                    Change Address
                  </Button>
                </div>
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
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </Wrapper>
    </div>
  );
}
