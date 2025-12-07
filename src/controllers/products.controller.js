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

export const createProduct = async (name, price, category) => {
    const product = {
        name,
        price,
        category
    };

    try {
        await productService.initialize();
    } catch (error) {
        console.error("Failed to initialize product service:", error);
        throw error;
    }

    return await productService.createProduct(product);
};
