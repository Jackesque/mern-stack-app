import User from "../models/User.js";
import Cart from "../models/Cart.js";

export const getCartByUserId = async (req, res) => {
  try {
    const { _id } = await User.findById(req.decoded.id);
    const userId = _id;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      console.log(userId);
      cart = new Cart({ userId, products: [] });
      console.log(cart);
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to retrieve cart." });
  }
};

export const addItemToCart = async (req, res) => {
  try {
    const { _id } = await User.findById(req.decoded.id);
    const userId = _id;
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart." });
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const { _id } = await User.findById(req.decoded.id);
    const userId = _id;
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Failed to remove item from cart." });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    cart.products = [];
    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully." });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart." });
  }
};
