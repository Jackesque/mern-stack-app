import Order from '../models/Order.js';

// Place a new order
export const placeOrder = async (req, res) => {
  const { user, products, totalPrice } = req.body;
  try {
    const order = new Order({ user, products, totalPrice });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
