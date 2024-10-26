import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCart = await api.get("/cart");
        const resProducts = await Promise.all(
          resCart.data.products.map(async (product) => {
            const resProduct = await api.get(`/product/${product.productId}`);
            return resProduct.data;
          })
        );

        setProducts(resProducts);
        setCart({
          ...resCart.data,
          products: resCart.data.products.map((cartProduct) => {
            const { name, description, price, imageUrl } = resProducts.find(
              (resProduct) => resProduct._id === cartProduct.productId
            );
            return {
              ...cartProduct,
              name,
              description,
              price,
              imageUrl,
            };
          }),
        });
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(product)
        ? prevSelectedProducts.filter((i) => i !== product)
        : [...prevSelectedProducts, product]
    );
  };

  const updateItemQuantity = async (productId, newQuantity) => {
    try {
      const res = await api.post("/cart", {
        productId,
        quantity: newQuantity,
      });
      if (!res.status === 200) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      setCart({
        ...res.data,
        products: res.data.products.map((cartProduct) => {
          const { name, description, price, imageUrl } = products.find(
            (resProduct) => resProduct._id === cartProduct.productId
          );
          return {
            ...cartProduct,
            name,
            description,
            price,
            imageUrl,
          };
        }),
      });
    } catch (error) {
      console.error("Failed to update cart item quantity:", error);
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      const res = await api.delete("/cart", { data: { productId } });
      if (!res.status === 200) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      setCart({
        ...res.data,
        products: res.data.products.map((cartProduct) => {
          const { name, description, price, imageUrl } = products.find(
            (resProduct) => resProduct._id === cartProduct.productId
          );
          return {
            ...cartProduct,
            name,
            description,
            price,
            imageUrl,
          };
        }),
      });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete(`/cart/${cart.userId}`);
      setCart({ products: [], totalPrice: 0 });
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const createOrder = async () => {
    try {
      await api.post("/order", { selectedProducts });
      navigate("/order");
    } catch (error) {
      console.error("Fail to create order:", error);
    }
  };

  if (!cart) return <p>Loading cart...</p>;
  return (
    <div className="flex flex-col items-start">
      <h1>Your Cart</h1>
      <div className="flex flex-col">
        {cart.products.length > 0 && (
          <button onClick={clearCart} className="self-end mx-4">
            Clear Cart
          </button>
        )}
        {cart.products.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((product) => (
                  <tr key={product.productId} className="*:px-4 *:py-1">
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product)}
                        onChange={() => handleCheckboxChange(product)}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-60 min-h-60"
                      />
                    </td>
                    <td>{product.quantity}</td>
                    <td>
                      <div className="flex gap-4">
                        <button
                          onClick={() =>
                            updateItemQuantity(product.productId, -1)
                          }
                          disabled={product.quantity <= 1 || isLoading}
                          className="size-8"
                        >
                          -
                        </button>
                        <button
                          onClick={() =>
                            updateItemQuantity(product.productId, 1)
                          }
                          disabled={isLoading}
                          className="size-8"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItemFromCart(product.productId)}
                          disabled={isLoading}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2>Total Price: ${cart.totalPrice}</h2>
          </div>
        )}
        {cart.products.length > 0 && (
          <button onClick={createOrder} className="self-end mx-4">
            Order
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
