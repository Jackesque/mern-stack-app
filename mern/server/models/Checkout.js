import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    billingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      country: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
      // enum: ["Card", "Cash", "Other"],
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        // productName and price are stored since they can change over time, and can lead to inconsistency. By saving these values in checkout, transaction data is preserved.
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    status: { type: String, default: "Pending", required: true },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

checkoutSchema.pre("save", async function (next) {
  let total = 0;
  for (let product of this.products) {
    total += product.price * product.quantity;
  }
  this.totalPrice = total;
  next();
});

const Checkout = mongoose.model("Checkout", checkoutSchema);

export default Checkout;
