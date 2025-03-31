import { Router } from "express";
import authenticate from "../middleware/authenticate";
import inventoryAccess from "../middleware/inventory";
import { createProduct, getProducts } from "../controllers/inventory.controller";

const router = Router();

//create an item in inventory
router.post("/product", [authenticate, inventoryAccess], createProduct);

//get items from admin inventory
router.get("/product", [authenticate, inventoryAccess], getProducts);

export default router;