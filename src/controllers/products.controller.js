import productService from "../services/products.service.js";
import * as Model from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
    const { category } = req.query;
    if (category) {
        const productsByCategory = await Model.getProductsByCategory(category);
      
        return res.json(productsByCategory);
    }

    const products = await Model.getAllProducts();
    res.json(products);
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Model.getProductById(id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
};

export const searchProducts = async (req, res) => {
    const { name } = req.query;
    const products = Model.getAllProducts();
    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase()));
    res.json(filteredProducts);
};

export const createProduct = async (req, res) => {
    const { name, price, category } = req.body;
    const newProduct = await Model.createProduct({ name, price, category });
    res.status(201).json(newProduct);
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, category } = req.body;
    if(!name || !price || !category) {
        return res.status(422).json({ message: "Missing fields to update product" });
    }
    const updated = await Model.updateProduct(id, { name, price, category });
    if (!updated) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updated);
};

export const updateProductPartial = async (req, res) => {
    const { id } = req.params;
    const data = {};
    if(req.body.name !== undefined) data.name = req.body.name;
    if(req.body.price !== undefined) data.price = req.body.price;
    if(req.body.category !== undefined) data.category = req.body.category;

    if(Object.keys(data).length === 0) {
        return res.status(422).json({ message: "No fields provided for update" });
    }

    const updated = await Model.updateProductPartial(id, data);
    if (!updated) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json( updated);
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Model.deleteProduct(id);
        if (!deleted) {
           return res.status(404).json({ error: "Product not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Error deleting product", error });
    }
};
