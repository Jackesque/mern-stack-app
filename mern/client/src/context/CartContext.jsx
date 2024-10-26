import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cartProducts.find((product) => product._id === product._id);

    if (existingProduct) {
      setCartProducts(
        cartProducts.map((product) =>
          product._id === product._id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    } else {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    }
  };

  const totalPrice = cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
