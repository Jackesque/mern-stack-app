import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { _id } = await User.findById(req.decoded.id);
    const userId = _id;
    const { selectedProducts } = req.body;
    console.log(selectedProducts);

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    if (selectedProducts.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid products selected for order." });
    }

    const newOrder = new Order({
      userId,
      products: selectedProducts,
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order." });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const { _id } = await User.findById(req.decoded.id);
    const userId = _id;
    const orders = await Order.find({ userId });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    res.status(500).json({ message: "Failed to retrieve orders." });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { _id } = await User.findById(req.decoded.id);
    const userId = _id;
    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ message: "Failed to retrieve order." });
  }
};
