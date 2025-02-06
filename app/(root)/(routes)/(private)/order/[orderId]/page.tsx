"use client";

import { getOrder } from "@/app/api/order";
import { Wrapper } from "@/components/Custom/wrapper";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { Package, ReceiptText, Truck } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SkeletonLoader = () => (
  <div className="w-full px-4 py-8 min-h-screen mt-24">
    <Wrapper className="flex flex-col gap-8">
      <div className="space-y-6 p-6 border rounded-lg animate-pulse">
        <div className="h-8 bg-gray-300 rounded-md w-1/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
        </div>
        <Separator />
        <div className="h-6 bg-gray-300 rounded-md w-1/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded-md w-full"></div>
          <div className="h-4 bg-gray-300 rounded-md w-2/3"></div>
        </div>
      </div>
      <div className="p-6 border rounded-lg animate-pulse">
        <div className="h-6 bg-gray-300 rounded-md w-1/3 mb-4"></div>
        <ul className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <li
              key={index}
              className="bg-gray-50 flex flex-col md:flex-row gap-4 p-4 border border-gray-300 rounded-lg shadow-md animate-pulse"
            >
              <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded-md w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded-md w-1/5"></div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
        </div>
      </div>
    </Wrapper>
  </div>
);

const OrderDetails = () => {
  const { isSignedIn } = useAuth();
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    if (!orderId || typeof orderId !== "string") {
      setError("Invalid Order ID.");
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
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p className="text-lg text-zinc-800">{error}</p>
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
    <div className="w-full px-4 py-8 min-h-screen mt-24">
      <Wrapper className="flex flex-col gap-8 ">
        <div className="space-y-6 p-6 border rounded-lg">
          <h2 className="text-3xl flex gap-4 items-center font-semibold text-gray-800 mb-4">
            <ReceiptText />
            Order Details
          </h2>
          <div className="space-y-1 text-gray-700">
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {order.isPaid ? "Paid" : "Pending"}
            </p>
          </div>
          <Separator />
          <h3 className="text-2xl gap-4 flex items-center font-semibold text-gray-800 mb-4">
            <Truck />
            Shipping Address
          </h3>
          {order.address ? (
            <div className="space-y-1 text-gray-700">
              <p>
                <strong>Street:</strong> {order.address.street},{" "}
                {order.address.number}
              </p>
              <p>
                <strong>Neighborhood:</strong> {order.address.neighborhood}
              </p>
              <p>
                <strong>City:</strong> {order.address.city}
              </p>
              <p>
                <strong>State:</strong> {order.address.state}
              </p>
              <p>
                <strong>ZIP Code:</strong> {order.address.zipCode}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">
              No shipping address associated with this order.
            </p>
          )}
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="flex gap-4 items-center text-2xl font-semibold text-gray-800 mb-4">
            <Package />
            Products
          </h3>
          {order.orderItems && order.orderItems.length > 0 ? (
            <ul className="space-y-6">
              {order.orderItems.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-50 flex flex-col md:flex-row gap-4 p-4 border border-gray-300 rounded-lg shadow-md"
                >
                  {item.product?.images?.[0]?.url && (
                    <div className="flex-shrink-0">
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.title || "Product image"}
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
                      {item.product?.productSizes?.[0]?.size?.name || "N/A"}
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
          ) : (
            <p className="text-gray-600">No items found in this order.</p>
          )}

          <div className="mt-6 text-xl font-bold text-gray-800">
            <p className="flex justify-between">
              <strong>Total:</strong>
              {order.total
                ? parseFloat(order.total).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : calculateTotal().toFixed(2).replace(".", ",")}
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default OrderDetails;
