import React, { useEffect, useState } from "react";
import api from "../../api";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/admin/order");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order List</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <strong>Order ID:</strong> {order._id}<br />
            <strong>User:</strong> {order.userId}<br />
            <strong>Total:</strong> ${order.total}<br />
            <strong>Products:</strong> {order.products.map(item => (
              <div key={item.productId}>
                {item.productName} (Quantity: {item.quantity})
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
