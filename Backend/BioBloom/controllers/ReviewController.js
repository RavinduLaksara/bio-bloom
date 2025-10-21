import Reviews from "../models/ReviewSchema.js";
import User from "../models/UserSchema.js";

// create review
export async function createReview(req, res) {
  try {
    const reviewData = req.body;

    // check if has a user
    if (!req.user) {
      return res.status(409).json({ message: "Not found user data..." });
    }
    // get user data
    const email = req.user.email;
    const user = await User.findOne({ email });
    reviewData.customer_id = user.userId;

    // add data in database
    const newReview = new Reviews(reviewData);
    await newReview.save();
    res.status(201).json({ message: "Review added successfully..." });
  } catch (e) {
    res.status(500).json({ message: "Error...", error: e });
  }
}

// get review data of specific product
export async function getReviews(req, res) {
  try {
    const { productId } = req.body;

    // get reviews
    const reviews = await Reviews.find({ productId });

    // create data array
    const reviewData = reviews.map(async (review) => {
      customer_name = await User.findOne(review.customer_id).name;
      content, rating, images;
    });

    res.status(201).json(reviewData);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
}
