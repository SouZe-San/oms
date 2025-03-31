import { Router } from "express";
import authenticate from "../middleware/authenticate";
import inventoryAccess from "../middleware/inventory";
import { createProduct, getProduct, getProducts, updateProduct } from "../controllers/inventory.controller";

const router = Router();

//create an item in inventory
router.post("/product", [authenticate, inventoryAccess], createProduct);

//get items from admin inventory
router.get("/product", [authenticate, inventoryAccess], getProducts);

//get item by id from admin inventory
router.get("/product/:id", [authenticate, inventoryAccess], getProduct);

//update item by id from admin inventory
router.put("/product/:id", [authenticate, inventoryAccess], updateProduct);

export default router;