import { Router } from "express";

// Import Cart controllers
import { createCart, deleteCart, getAllCarts, getSingleCart, updateCart } from "../controllers/cart.controller";
import { getAllProducts, getSingleProduct } from "../controllers/customer.product.controller";

// Import middleware
import authenticate from "../middleware/authenticate";

// Create route object
const router = Router();

//! Product Routes - for customers
router.get("/products", getAllProducts);
router.get("/product/:id", getSingleProduct);

//! Carts Routes
router.route("/carts").get(authenticate, getAllCarts);
router.route("/cart/:id").get(authenticate, getSingleCart);
router.route("/cart").post(authenticate, createCart);
router.route("/cart/").put(authenticate, updateCart);
router.route("/cart/:id").delete(authenticate, deleteCart);

//! Order Routes

export default router;
