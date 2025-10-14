import express from "express";
import { createUser } from "../controllers/UserController";

const userRoute = express.Router();
userRoute.post("/signup", createUser);

export default userRoute;
