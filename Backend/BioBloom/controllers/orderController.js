import Order from "../models/orderSchema.js";
import Products from "../models/ProductSchema.js";
import User from "../models/UserSchema.js";

// create order
export async function createOrder(req, res) {
  try {
    const { products, address, phone_no } = req.body;

    // check if has a user
    if (!req.user) {
      return res.status(409).json({ message: "User details not found" });
    }

    // find user details
    const customer = await User.findOne({ userId: req.user.id });

    if (!customer) {
      return res.status(404).json({ message: "Not found customer" });
    }
    const customerId = customer.userId;

    // create order id
    let orderId;
    const latestOrder = await Order.find().sort({ Date: -1 }).limit(1);
    if (latestOrder.length === 0) {
      orderId = "BBO1000";
    } else {
      const currentId = latestOrder[0].orderId;
      orderId =
        "BBO" + (parseInt(currentId.slice(3)) + 1).toString().padStart(4, "0");
    }

    // get products details
    const orderItems = [];
    let total = 0;
    for (const item of products) {
      // find product details
      const product = await Products.findOne({ productId: item.id });

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.id}` });
      }

      let itemTotal = product.actualPrice * item.quantity;
      total += itemTotal;
      orderItems.push({
        product_id: item.id,
        name: product.name,
        price: product.actualPrice,
        quantity: item.quantity,
        image: product.images[0],
      });
    }
    const orderDetails = {
      orderId,
      customerId,
      orderItems,
      total,
      address,
      phone_no,
    };

    const order = new Order(orderDetails);
    await order.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: order });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
  }
}
// get all orders
// get order by id
// get user orders
// update order status
