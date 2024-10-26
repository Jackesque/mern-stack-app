import User from "../models/User.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Checkout from "../models/Checkout.js";

export const getAllCheckouts = async (req, res) => {
  try {
    const checkouts = await Checkout.find();
    res.status(200).json(checkouts);
  } catch (error) {
    console.error("Error fetching checkouts:", error);
    res.status(500).json({ message: "Failed to retrieve checkouts." });
  }
};

export const createCheckout = async (req, res) => {
  try {
    const { _id } = await User.findById(req.decoded.id);
    const userId = _id;
    const { orderId, billingAddress, paymentMethod, products } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    const order = await Order.findOne({ _id: orderId, userId });
    // const products = await Promise.all(
    //   order.products.map(async (product) => {
    //     const productInfo = await Product.findById(product.productId);
    //     return {
    //       productId: product.productId,
    //       productName: productInfo.name,
    //       price: productInfo.price,
    //       quantity: product.quantity,
    //     };
    //   })
    // );
    if (!order || order.products.length === 0) {
      return res.status(400).json({ message: "Order is empty or not found." });
    }

    const newCheckout = new Checkout({
      userId,
      orderId,
      billingAddress,
      paymentMethod,
      products,
    });

    await newCheckout.save();
    cart.products = cart.products.filter(
      (product) => !order.products.includes(product.productId.toString())
    );
    await cart.save();

    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout:", error);
    res.status(500).json({ message: "Failed to create checkout." });
  }
};

export const getCheckoutsByUserId = async (req, res) => {
  try {
    const { _id } = await User.findById(req.decoded.id);
    const userId = _id;
    const checkouts = await Checkout.find({ userId });

    if (checkouts.length === 0) {
      return res
        .status(404)
        .json({ message: "No checkouts found for this user." });
    }

    res.status(200).json(checkouts);
  } catch (error) {
    console.error("Error fetching checkouts by user ID:", error);
    res.status(500).json({ message: "Failed to retrieve checkouts." });
  }
};

export const getCheckoutById = async (req, res) => {
  try {
    const { checkoutId } = req.params;
    const { _id } = await User.findById(req.decoded.id);
    const userId = _id;
    const checkout = await Checkout.findOne({ _id: checkoutId, userId });

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found." });
    }

    res.status(200).json(checkout);
  } catch (error) {
    console.error("Error fetching checkout by ID:", error);
    res.status(500).json({ message: "Failed to retrieve checkout." });
  }
};
