import React, { useState, useEffect } from "react";
import api from "../api";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>Order #{order._id}</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.name} - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p>Total: ${order.totalPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderPage;
