// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import api from "../api";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.get("/product");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <img src={product.image} alt={product.name} />
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
