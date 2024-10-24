import React, { useEffect, useState } from "react";
import api from "../../api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("admin/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);
  const handleAdd = async () => {
    const newProduct = {
      name: "New Product",
      price: 0,
    };

    try {
      const response = await api.post("/admin/product", newProduct);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/product/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={handleAdd}>Add product</button>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - {product.price}
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
