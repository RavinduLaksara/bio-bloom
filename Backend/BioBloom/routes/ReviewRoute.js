import express from "express";
import { createReview, getReviews } from "../controllers/ReviewController.js";

const reviewRoute = express.Router();
reviewRoute.post("/", createReview);
reviewRoute.post("/get-all", getReviews);

export default reviewRoute;
