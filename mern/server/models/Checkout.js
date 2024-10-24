import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    billingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Credit Card", "Cash", "Other"],
    },
    items: [
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
    },
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
  for (let item of this.items) {
    total += item.price * item.quantity;
  }
  this.totalPrice = total;
  next();
});

const Checkout = mongoose.model("Checkout", checkoutSchema);

export default Checkout;
