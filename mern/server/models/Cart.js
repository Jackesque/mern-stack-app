import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

cartSchema.pre("save", async function (next) {
  let total = 0;
  for (let item of this.items) {
    const product = await mongoose.model("Product").findById(item.productId);
    total += product.price * item.quantity;
  }
  this.totalPrice = total;
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
