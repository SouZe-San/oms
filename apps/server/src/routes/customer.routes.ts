import { Router } from "express";

// Import Cart controllers
import { getCart, updateCart } from "../controllers/cart.controller";
import { getAllProducts, getSingleProduct } from "../controllers/customer.product.controller";

// Import middleware
import authenticate from "../middleware/authenticate";

// Create route object
const router = Router();

//! Product Routes - for customers
router.get("/products", getAllProducts);
router.get("/product/:id", getSingleProduct);

//! Carts Routes
router.route("/cart").get(authenticate, getCart);
router.route("/cart").put(authenticate, updateCart);

//! Order Routes

export default router;
