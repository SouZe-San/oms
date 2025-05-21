import { Router } from "express";

// Import middleware
import authenticate from "../middleware/authenticate";

// Import Cart controllers
import { getCart, updateCart } from "../controllers/cart.controller";

// import Product controllers
import { getAllProducts, getSingleProduct } from "../controllers/customer.product.controller";

// Import Order controllers
import {
  createOrder,
  deleteOrder,
  orderSingleItem,
  updateOrder,
  getAllOrders,
  getOrder,
} from "../controllers/order.controller";

// Create route object
const router = Router();

//! Product Routes - for customers
router.get("/products", getAllProducts);
router.get("/product/:id", getSingleProduct);
router.get("/products/:name", getAllProducts);
//! Carts Routes
router.route("/cart").get(authenticate, getCart);
router.route("/cart").put(authenticate, updateCart);

//! Order Routes
router.route("/orders").get(authenticate, getAllOrders);
router.route("/order/:id").get(authenticate, getOrder);
router.route("/order").post(authenticate, createOrder);
router.route("/order/single").post(authenticate, orderSingleItem);
router.route("/order/:id").put(authenticate, updateOrder);
router.route("/order/:id").delete(authenticate, deleteOrder);

export default router;
