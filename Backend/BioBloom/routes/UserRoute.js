import express from "express";
import { createUser, userLogin } from "../controllers/UserController.js";

const userRoute = express.Router();
userRoute.post("/signup", createUser);
userRoute.post("/login", userLogin);

export default userRoute;
