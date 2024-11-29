import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      // WE NEED TO USE THE PRODUCT AS REFERENCE IF WE WANT TO MODIFY SOME OF THE PRODUCTS DATA (e.g., stocks)

      // RESET THE ORDERS AND CREATE A NEW ONE. WITH PRODUCT ID SUBMITTING IN ORDER SUMMARY FOR PRODUCT REFERENCE TO GET THE SPECIFIC PRODUCT AND OTHER FIELDS OF PRODUCT (e.g., imageUrl) FOR ADMIN ORDERS PAGE, FOR UPDATING THE STATUS OF BOTH ORDER AND PRODUCT.
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String, required: true },
      imageUrl: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: Number, required: true },
      size: { type: String },
      deliveryOption: {
        date: { type: String, required: true },
        fee: { type: Number, required: true },
      },
      productStatus: {
        type: String,
        enum: ["toPay", "toReceive", "delivered", "cancelled"],
        default: "toPay",
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled", "partial"],
    default: "pending",
    required: true,
  } /* PENDING: means that all of the products were not completely change its status
        COMPLETED: means that all of the products were delivered
        TERMINATED: means the order were cancelled
        PARTIAL OR PARTIALLY-COMPLETED: means the some of the products inside of the order were delivered but not all of it. */,
  totalFee: { type: String, required: true },
  paymentMethod: { type: String, required: true }, //e.g., credit card, paylater, cod
  shippingAddress: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
