import { Router } from "express";
import authenticate from "../middleware/authenticate";
import inventoryAccess from "../middleware/inventory";
import { createProduct } from "../controllers/inventory.controller";

const router = Router();

//create an item in inventory
router.post("/product", [authenticate, inventoryAccess], createProduct);

export default router;