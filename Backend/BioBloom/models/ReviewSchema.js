import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  images: [String],
});

const reviews = mongoose.model("reviews", reviewSchema);
export default reviews;
