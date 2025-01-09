"use client";

import { getOrder } from "@/app/api/order";
import { Wrapper } from "@/components/Custom/wrapper";
import { Order } from "@/lib/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId || typeof orderId !== "string") {
      setError("Invalid ID.");
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const orderData = await getOrder(orderId);
        setOrder(orderData);
      } catch (err: any) {
        setError(err.message || "Error loading order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const calculateTotal = () => {
    if (!order?.orderItems) return 0;
    return order.orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p className="text-lg text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p className="text-lg text-gray-600">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 min-h-screen">
      <Wrapper className="flex flex-col gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Order Details
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {order.isPaid ? "Paid" : "Pending"}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Shipping Address
          </h3>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Street:</strong> {order.address?.street}
            </p>
            <p>
              <strong>Neighborhood:</strong> {order.address?.neighborhood}
            </p>
            <p>
              <strong>City:</strong> {order.address?.city}
            </p>
            <p>
              <strong>State:</strong> {order.address?.state}
            </p>
            <p>
              <strong>ZIP Code:</strong> {order.address?.zipCode}
            </p>
            <p>
              <strong>Number:</strong> {order.address?.number}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Order Items
          </h3>
          <ul className="space-y-6">
            {order.orderItems?.map((item) => (
              <li
                key={item.id}
                className="bg-gray-50 flex flex-col md:flex-row gap-4 p-4 border border-gray-300 rounded-lg shadow-md"
              >
                {item.product?.images?.[0]?.url && (
                  <div className="flex-shrink-0">
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.title}
                      width={120}
                      height={120}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    <strong>Product:</strong>{" "}
                    {item.product?.title || "Name unavailable"}
                  </p>
                  <p className="text-md text-gray-600">
                    <strong>Category:</strong>{" "}
                    {item.product?.category?.name || "Category unavailable"}
                  </p>
                  <p className="text-md text-gray-600">
                    <strong>Size:</strong>{" "}
                    {item.product?.productSizes[0]?.size?.name ||
                      "Size unavailable"}
                  </p>
                  <p className="text-md text-gray-600">
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p className="text-md text-gray-600">
                    <strong>Price:</strong> R$ {item.price.toFixed(2)}
                  </p>
                  <p className="text-md text-gray-800 font-semibold">
                    <strong>Item Total:</strong> R${" "}
                    {(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-xl font-bold text-gray-800">
            <p className="flex justify-between">
              <strong>Total:</strong> R$
              {calculateTotal().toFixed(2).replace(".", ",")}
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default OrderDetails;
