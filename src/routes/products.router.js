import { Router } from "express";
import { getAllProducts, getProductById, searchProducts, createProduct, updateProduct, updateProductPartial, deleteProduct } from "../controllers/products.controller.js";

const router = Router();
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.get("/products/search", searchProducts);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.patch("/products/:id", updateProductPartial);

router.delete("/products/:id", deleteProduct);

export default router;