// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import api from "../api";
import { NavLink } from "react-router-dom";

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
      <ul className="flex flex-wrap">
        {products.map((product) => (
          <li key={product._id}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-60 min-h-60"
            />
            <p>{product.name}</p>
            <p>Price: ${product.price}</p>
            <NavLink to={`/product/${product._id}`}>View product</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
