import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
  order_items: [
    {
      product_id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  address: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
});

const orders = mongoose.model("orders", orderSchema);
export default orders;
