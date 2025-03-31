import { Router } from "express";
import authenticate from "../middleware/authenticate";
import inventoryAccess from "../middleware/inventory";
import { createProduct, getProduct, getProducts, } from "../controllers/inventory.controller";

const router = Router();

//create an item in inventory
router.post("/product", [authenticate, inventoryAccess], createProduct);

//get items from admin inventory
router.get("/product", [authenticate, inventoryAccess], getProducts);

//get item by id from admin inventory
router.get("/product/:id", [authenticate, inventoryAccess], getProduct);

export default router;