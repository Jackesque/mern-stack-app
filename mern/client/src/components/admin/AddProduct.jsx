import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState(0);
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const res = await api.get(`/admin/product/${id}`);
      if (res.status === 404) {
        console.warn(`Product with id ${id} not found`);
        navigate(-1);
        return;
      }
      if (res.status === 500) {
        console.error(`An error has occurred: ${res.data.message}`);
        return;
      }
      const { name, description, price, imageUrl, stock } = res.data;
      setName(name);
      setDescription(description);
      setPrice(price);
      setImageUrl(imageUrl);
      setStock(stock);
    };

    fetchData();
    return;
  }, [params.id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNew) {
      try {
        const response = await api.post("/admin/product", {
          name,
          description,
          price,
          imageUrl,
          stock,
        });
        if (response.status === 201) {
          setName("");
          setDescription("");
          setPrice(0);
          setImageUrl("");
          setStock(0);

          alert("Product added successfully!");
          navigate(-1);
        }
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product.");
      }
    } else {
      try {
        const response = await api.patch(`/admin/product/${params.id}`, {
          name,
          description,
          price,
          imageUrl,
          stock,
        });
        if (response.status === 200) {
          setName("");
          setDescription("");
          setPrice(0);
          setImageUrl("");
          setStock(0);

          alert("Product updated successfully!");
          navigate(-1);
        }
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product.");
      }
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </label>
        <button type="submit">{isNew ? "Add" : "Update"} Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
