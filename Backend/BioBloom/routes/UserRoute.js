import express from "express";
import {
  createUser,
  userLogin,
  verifyOtp,
} from "../controllers/UserController.js";

const userRoute = express.Router();
userRoute.post("/signup", createUser);
userRoute.post("/login", userLogin);
userRoute.post("/verify-otp", verifyOtp);

export default userRoute;
