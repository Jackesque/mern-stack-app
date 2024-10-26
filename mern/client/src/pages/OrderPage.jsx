import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [billingAddress, setBillingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resOrder = await api.get("/order");
        const orderedProducts = [
          ...new Set(
            resOrder.data.flatMap((order) =>
              order.products.map((product) => product.productId)
            )
          ),
        ].map((product) => ({ productId: product }));
        const resProducts = await Promise.all(
          orderedProducts.map(async (product) => {
            const resProduct = await api.get(`/product/${product.productId}`);
            return resProduct.data;
          })
        );

        setProducts(resProducts);
        setOrders(
          resOrder.data.map((order) => ({
            ...order,
            products: order.products.map((orderProduct) => {
              const { name, price } = resProducts.find(
                (resProduct) => resProduct._id === orderProduct.productId
              );
              return {
                ...orderProduct,
                productName: name,
                price,
              };
            }),
          }))
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, []);

  const handleRadioChange = (order) => {
    setSelectedOrder({
      ...selectedOrder,
      orderId: order._id,
      products: order.products,
    });
  };

  const createCheckout = async () => {
    try {
      console.log(selectedOrder);
      await api.post("/checkout", selectedOrder);
      alert("Checkout created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Fail to create checkout:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const billingAddress = {
      fullName: formData.get("fullName"),
      address: formData.get("address"),
      country: formData.get("country"),
    };
    let paymentMethod = formData.get("paymentMethod");
    if (paymentMethod === "other") {
      paymentMethod = paymentMethod.concat(
        ` (${formData.get("otherPaymentMethod")})`
      );
    }
    setSelectedOrder({ ...selectedOrder, billingAddress, paymentMethod });
  };

  if (!orders) return <p>Loading orders...</p>;
  return (
    <div className="flex flex-col items-start">
      <form className="mb-4 w-full" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            className="ml-2 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            className="ml-2 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="ml-2 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium text-gray-700"
          >
            Payment Method
          </label>
          <div className="mt-1">
            <div>
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="card"
                className="mr-2"
                onChange={() =>
                  setSelectedOrder({ ...selectedOrder, paymentMethod: "card" })
                }
              />
              <label htmlFor="card">Credit/Debit Card</label>
            </div>
            <div>
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                className="mr-2"
                onChange={() =>
                  setSelectedOrder({ ...selectedOrder, paymentMethod: "cash" })
                }
              />
              <label htmlFor="cash">Cash</label>
            </div>
            <div>
              <input
                type="radio"
                id="other"
                name="paymentMethod"
                value="other"
                className="mr-2"
                onChange={() =>
                  setSelectedOrder({ ...selectedOrder, paymentMethod: "other" })
                }
              />
              <label htmlFor="other">Other</label>
              <input
                type="text"
                id="otherPaymentMethod"
                name="otherPaymentMethod"
                placeholder="Please specify"
                className="ml-2 px-3 py-2 border border-gray-300 rounded-md"
                required={selectedOrder.paymentMethod === "other"}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="self-end mx-4">
          Save
        </button>
      </form>
      <h1>Your Orders</h1>
      <div className="flex flex-col">
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Products</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="*:px-4 *:py-1">
                  <td>
                    <label htmlFor={order._id}>
                      <input
                        type="radio"
                        id={order._id}
                        name="orders"
                        onChange={() => handleRadioChange(order)}
                      />
                    </label>
                  </td>
                  <td>
                    <h3>Order:</h3>
                    <ul>
                      {order.products.map((product) => (
                        <li key={product.productId}>
                          <p>- Name: {product.productName}</p>
                          <p>- Price: ${product.price}</p>
                          <p>- Quantity: {product.quantity}</p>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>${order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={createCheckout} className="self-end mx-4">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
