import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  displayPrice: {
    type: Number,
  },
  images: [String],
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const products = mongoose.model("products", productSchema);
export default products;
