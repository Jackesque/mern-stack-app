import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Checkout from "../models/Checkout.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users." });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ userId: id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user's cart." });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to get orders." });
  }
};

export const getCheckouts = async (req, res) => {
  try {
    const checkouts = await Checkout.find();
    res.status(200).json(checkouts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get checkouts." });
  }
};
