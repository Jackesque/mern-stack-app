import React, { useEffect, useState } from "react";
import api from "../../api";
import { NavLink } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/admin/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/product/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <h1>Product List</h1>
      <div className="flex flex-col">
        <NavLink to="/admin/product/add" className="self-end mx-4">
          Add Product
        </NavLink>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="*:px-4 *:py-1">
                <td>
                  <p>{product.name}</p>
                </td>
                <td>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-60 min-h-60"
                  />
                </td>
                <td>
                  <p>{product.description}</p>
                </td>
                <td>
                  <p>Price: ${product.price}</p>
                </td>
                <td>
                  <p>Stock: {product.stock}</p>
                </td>
                <td>
                  <NavLink to={`/admin/product/edit/${product._id}`}>
                    Edit
                  </NavLink>
                </td>
                <td>
                  <button onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
