import { Router } from "express";
import authenticate from "../middleware/authenticate";
import inventoryAccess from "../middleware/inventory";
import { createProduct, deleteProduct, getLowStockProducts, getProduct, getProducts, searchProduct, updateProduct } from "../controllers/inventory.controller";

const router = Router();

//create an item in inventory
router.post("/product", [authenticate, inventoryAccess], createProduct);

//get items from admin inventory
router.get("/product", [authenticate, inventoryAccess], getProducts);

//get stock admin inventory
router.get("/stock/low", [authenticate, inventoryAccess], getLowStockProducts);

//get item by id from admin inventory
router.get("/product/:id", [authenticate, inventoryAccess], getProduct);

//search product by name
router.get("/product/search", [authenticate, inventoryAccess], searchProduct);

//update item by id from admin inventory
router.put("/product/:id", [authenticate, inventoryAccess], updateProduct);

//delete item by id from admin inventory
router.delete("/product/:id", [authenticate, inventoryAccess], deleteProduct);

export default router;