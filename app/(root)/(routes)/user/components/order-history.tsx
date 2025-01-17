import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/lib/types";
import { getOrders } from "@/app/api/order";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const OrdersHistory = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchOrders = async () => {
      const storedAddress = localStorage.getItem(`${user?.id}_selectedAddress`);
      const selectedAddress = storedAddress ? JSON.parse(storedAddress) : null;

      if (!selectedAddress?.userId) {
        return;
      }

      try {
        const data = await getOrders(selectedAddress?.userId);
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  if (loading) {
    return <p className="px-2">Loading orders...</p>;
  }

  if (error) {
    return <p className="px-2">{error}</p>;
  }

  return (
    <div className="w-full px-6">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">
          You {`haven't`} placed any orders yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table className="border rounded-lg">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => {
                const orderTotal = order.orderItems?.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                );

                return (
                  <TableRow key={order.id} className="hover:bg-gray-100">
                    <TableCell>
                      {order.orderItems && order.orderItems.length > 0 && (
                        <Link
                          href={`/user/${order.id}`}
                          className="flex items-center gap-2"
                        >
                          {order.orderItems[0].product?.images?.[0]?.url && (
                            <Image
                              src={order.orderItems[0].product.images[0].url}
                              alt={order.orderItems[0].product.title}
                              width={50}
                              height={50}
                              className="rounded-lg object-cover"
                            />
                          )}
                          <span className="text-ellipsis w-full overflow-hidden whitespace-nowrap">
                            {order.orderItems[0].product?.title || "No Product"}
                          </span>
                        </Link>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${orderTotal?.toFixed(2) || "0.00"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {orders.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white rounded-lg ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-zinc-800"
            }`}
          >
            Previous
          </button>
          <p className="text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-zinc-800"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersHistory;
