import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { CartContext } from "../context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart!");
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;
