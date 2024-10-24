import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, totalPrice } = useContext(CartContext);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <h2>Total Price: ${totalPrice}</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;
