import express from "express";
import {
  createUser,
  userLogin,
  verifyOtp,
  verifyEmail,
  resetPassword,
} from "../controllers/UserController.js";

const userRoute = express.Router();
userRoute.post("/signup", createUser);
userRoute.post("/login", userLogin);
userRoute.post("/verify-otp", verifyOtp);
userRoute.post("/reset-password/verify-email", verifyEmail);
userRoute.post("/reset-password", resetPassword);

export default userRoute;
