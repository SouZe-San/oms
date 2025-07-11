import { Router } from "express";

// Import middleware
import authenticate from "../middleware/authenticate";

// Import Cart controllers
import { addInCart, getCart, updateCart } from "../controllers/cart.controller";

// import Product controllers
import { getAllProducts, getAllProductsByName, getSingleProduct } from "../controllers/product.controller";

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
router.get("/products/search/:name", getAllProductsByName);
//! Carts Routes
router.route("/cart").get(authenticate, getCart);
router.route("/cart").put(authenticate, updateCart);
router.route("/cart").post(authenticate, addInCart);

//! Order Routes
router.route("/orders").get(authenticate, getAllOrders);
router.route("/order/:id").get(authenticate, getOrder);
router.route("/order").post(authenticate, createOrder);
router.route("/order/single").post(authenticate, orderSingleItem);
router.route("/order/:id").put(authenticate, updateOrder);
router.route("/order/:id").delete(authenticate, deleteOrder);

export default router;
