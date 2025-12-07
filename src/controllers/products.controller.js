import productService from "../services/products.service.js";


export const getProducts = (req, res) => {
    res.json(productService.getProducts());
};

export const getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = productService.getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};