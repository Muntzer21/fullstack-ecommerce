"use client";

import { useEffect, useState } from "react";
import { getMyOrders } from "@/services/order.service";
import OrderCard from "./OrderCard";
import EmptyOrders from "./EmptyOrders";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const data = await getMyOrders();
      setOrders(data);
    }

    loadOrders();
  }, []);

  if (!orders.length) {
    return <EmptyOrders />;
  }

  return (
    <div className="space-y-6">
      {orders.map((order: any) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
