"use client";

import React, { useEffect, useState } from "react";
import { Wrapper } from "@/components/Custom/wrapper";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { createOrder } from "@/app/api/order";
import { Address } from "@/lib/types";

export default function PaymentPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<any | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [errors, setErrors] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  useEffect(() => {
    const storedOrderDetails = localStorage.getItem(`${user?.id}_orderDetails`);
    if (storedOrderDetails) {
      setOrderDetails(JSON.parse(storedOrderDetails));
    } else {
      toast.error("No order details found. Redirecting...");
      setTimeout(() => router.push("/order"), 500);
    }

    if (user?.id) {
      const storedAddress = localStorage.getItem(`${user.id}_selectedAddress`);
      if (storedAddress) {
        setSelectedAddress(JSON.parse(storedAddress));
      } else {
        toast.error("No address selected. Redirecting...");
        setTimeout(() => router.push("/address"), 500);
      }
    }
  }, [router, user]);

  const handleConfirmPayment = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    const newErrors = validateForm();
    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      setIsProcessing(false);
      return;
    }

    try {
      if (!orderDetails) {
        toast.error("Order details are missing.");
        setIsProcessing(false);
        return;
      }

      if (!selectedAddress) {
        toast.error("No address selected. Redirecting...");
        setTimeout(() => router.push("/address"), 500);
        setIsProcessing(false);
        return;
      }

      if (!selectedAddress.userId) {
        toast.error("User ID is missing in the selected address.");
        setIsProcessing(false);
        return;
      }

      const { cartItems, total } = orderDetails;

      await createOrder(cartItems, total, selectedAddress.userId);

      localStorage.removeItem(`${user?.id}_orderDetails`);
      localStorage.removeItem(`${user?.id}_cartItems`);

      toast.success("Payment confirmed! Order created successfully.");
      router.push("/");
    } catch (error) {
      console.error("Error confirming payment:", error);
      toast.error("An error occurred while processing your payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!cardholderName) {
      newErrors.cardholderName = "Cardholder name is required.";
    }

    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumber) {
      newErrors.cardNumber = "Card number is required.";
    } else if (!cardNumberRegex.test(cardNumber)) {
      newErrors.cardNumber = "Invalid card number. Must be 16 digits.";
    }

    const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expirationDate) {
      newErrors.expirationDate = "Expiration date is required.";
    } else if (!expirationDateRegex.test(expirationDate)) {
      newErrors.expirationDate = "Invalid expiration date. Format MM/YY.";
    }

    const cvvRegex = /^\d{3}$/;
    if (!cvv) {
      newErrors.cvv = "CVV is required.";
    } else if (!cvvRegex.test(cvv)) {
      newErrors.cvv = "Invalid CVV. Must be 3 digits.";
    }

    return newErrors;
  };

  return (
    <div className="w-full h-auto mt-24 flex flex-col items-center justify-start">
      <Wrapper className="w-full flex flex-col space-y-6">
        <div className="bg-white w-full rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Payment Page</h1>
          <p className="text-lg text-gray-600 text-center mb-6">
            Review your order and confirm payment.
          </p>

          {orderDetails ? (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Order Details</h2>
              <div className="border rounded-md p-4 space-y-2">
                {orderDetails.cartItems.map((item: any, index: number) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {item.title} (x{item.quantity})
                    </span>
                    <span>
                      R${" "}
                      {(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>
                  R$ {orderDetails.total.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No order details available.</p>
          )}

          {selectedAddress ? (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
              <div className="border rounded-md p-4 space-y-2">
                <p>
                  {selectedAddress.street}, {selectedAddress.neighborhood}
                </p>
                <p>
                  {selectedAddress.city}, {selectedAddress.state}
                </p>
                <p>{selectedAddress.zipCode}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No address selected.</p>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full p-3 border rounded-md"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-sm">{errors.cardholderName}</p>
            )}

            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 border rounded-md"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber}</p>
            )}

            <input
              type="text"
              placeholder="Expiration Date (MM/YY)"
              className="w-full p-3 border rounded-md"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
            {errors.expirationDate && (
              <p className="text-red-500 text-sm">{errors.expirationDate}</p>
            )}

            <input
              type="text"
              placeholder="CVV"
              className="w-full p-3 border rounded-md"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
          </div>

          <button
            className={`mt-6 w-full bg-zinc-900 text-white py-3 font-bold rounded-lg hover:bg-zinc-800 transition-colors ease-in-out ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleConfirmPayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </Wrapper>
      <Toaster />
    </div>
  );
}
