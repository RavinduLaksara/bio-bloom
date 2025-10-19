import express from "express";
import {
  addProduct,
  getAllProducts,
} from "../controllers/productController.js";

const productRoute = express.Router();
productRoute.post("/", addProduct);
productRoute.get("/", getAllProducts);

export default productRoute;
