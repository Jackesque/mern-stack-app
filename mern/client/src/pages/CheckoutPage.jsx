// src/pages/CheckoutPage.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api";

const CheckoutPage = () => {
  const { cartProducts, clearCart } = useContext(CartContext);

  const handleCheckout = async () => {
    try {
      const order = { products: cartProducts };
      await api.post("/order", order);
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
