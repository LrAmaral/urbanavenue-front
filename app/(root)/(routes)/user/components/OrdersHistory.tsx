import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 

const orders = [
  {
    id: "1234",
    date: "2024-08-24",
    status: "Delivered",
    total: "$120.00",
  },
  {
    id: "1235",
    date: "2024-08-22",
    status: "Processing",
    total: "$80.00",
  },
  {
    id: "1236",
    date: "2024-08-20",
    status: "Cancelled",
    total: "$50.00",
  },
];

const OrdersHistory = () => {
  return (
    <div className="w-full px-6">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersHistory;
