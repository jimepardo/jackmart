import { Router } from "express";
import { getAllProducts, getProductById, searchProducts, createProduct, updateProduct, updateProductPartial, deleteProduct } from "../controllers/products.controller.js";

const router = Router();
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.patch("/:id", updateProductPartial);

router.delete("/:id", deleteProduct);

export default router;