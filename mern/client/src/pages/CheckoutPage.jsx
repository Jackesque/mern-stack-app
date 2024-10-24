// src/pages/CheckoutPage.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const handleCheckout = async () => {
    try {
      const order = { items: cartItems };
      await api.post("/orders", order);
      alert("Order placed successfully!");
      clearCart();
    } catch (error) {
      alert("Failed to place order");
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
