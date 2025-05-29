import { Router } from "express";
import { manageOrder } from "../controllers/manage.controller";

const router = Router();

router.put("/order/:id", manageOrder)

export default router;