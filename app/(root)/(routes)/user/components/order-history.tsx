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

const OrdersHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (err) {
        console.error("Error while loading orders:", err);
        setError("Error while loading orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full px-6">
      <h2 className="text-xl font-semibold mb-4">My orders</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.slice(0, 4).map((order) => {
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
                        className="flex items-center"
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
                        {order.orderItems[0].product?.title || "No Product"}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>$ {orderTotal?.toFixed(2) || "0.00"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersHistory;
