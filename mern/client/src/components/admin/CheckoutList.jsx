import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckoutList = () => {
  const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await axios.get(`${process.env.SERVER_URL}/admin/checkouts`);
        setCheckouts(response.data);
      } catch (error) {
        console.error("Failed to fetch checkouts:", error);
      }
    };
    fetchCheckouts();
  }, []);

  return (
    <div>
      <h1>Checkout List</h1>
      <ul>
        {checkouts.map(checkout => (
          <li key={checkout._id}>
            <strong>Checkout ID:</strong> {checkout._id}<br />
            <strong>User:</strong> {checkout.userId}<br />
            <strong>Total Amount:</strong> ${checkout.totalAmount}<br />
            <strong>Billing Address:</strong> {checkout.billingAddress}<br />
            <strong>Payment Method:</strong> {checkout.paymentMethod}<br />
            <strong>Items:</strong> {checkout.items.map(item => (
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

export default CheckoutList;