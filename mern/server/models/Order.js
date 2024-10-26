import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  let total = 0;
  for (let product of this.products) {
    const { price } = await mongoose
      .model("Product")
      .findById(product.productId);
    total += price * product.quantity;
  }
  this.totalPrice = total;
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
