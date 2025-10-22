import express from "express";
import { createReview, getReviews } from "../controllers/ReviewController.js";
import authToken from "../middleware/AuthMiddleware.js";

const reviewRoute = express.Router();
reviewRoute.post("/", authToken, createReview);
reviewRoute.post("/get-all", getReviews);

export default reviewRoute;
