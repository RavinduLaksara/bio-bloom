import products from "../models/ProductSchema.js";
import Products from "../models/ProductSchema.js";

// add new product
export async function addProduct(req, res) {
  try {
    const productData = req.body;

    // check isAdmin
    if (!isAdmin()) {
      return res.status(401).json({ message: "Unauthorized Access..." });
    }

    // create product Id
    const latestProduct = await Products.find()
      .sort({ createdAt: -1 })
      .limit(1);
    let productId;
    if (latestProduct.length === 0) {
      productId = "BBP001";
    } else {
      const currentId = latestProduct[0].productId;
      productId =
        "BBP" + (parseInt(currentId.slice(3)) + 1).toString().padStart(4, "0");
    }

    productData.productId = productId;

    // create new product
    const newProduct = new products(productData);
    await newProduct.save();
    res.status(201).json({ message: "Successfully added new product!" });
  } catch (e) {
    res.status(500).json({ message: "Error...", error: e });
  }
}
// get all products
export async function getAllProducts(req, res) {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(500).jsn({ message: "Error...", error: e });
  }
}
// get deatails of single product
// update product details
// Delete product

// check admin token
export function isAdmin(req) {
  if (!req.user) {
    return false;
  }
  if (req.user.role != "admin") {
    return false;
  }
  return true;
}
