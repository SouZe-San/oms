import { Router } from "express";

// Import middleware
import authenticate from "../middleware/authenticate";

// Import Cart controllers
import { getCart, updateCart } from "../controllers/cart.controller";

// import Product controllers
import { getAllProducts, getSingleProduct } from "../controllers/customer.product.controller";

// Import Order controllers
import { createOrder } from "../controllers/order.controller";

// Create route object
const router = Router();

//! Product Routes - for customers
router.get("/products", getAllProducts);
router.get("/product/:id", getSingleProduct);

//! Carts Routes
router.route("/cart").get(authenticate, getCart);
router.route("/cart").put(authenticate, updateCart);

//! Order Routes
router.route("/order").post(authenticate, createOrder);

export default router;
