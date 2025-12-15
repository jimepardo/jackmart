import * as model from "../models/Product.js";

export const getAllProducts = () => {
    return model.getAllProducts();
};

export const getProductById = (id) => {
    return model.getProductById(id);
};

export const getProductsByCategory = (categoryId) => {
    return model.getProductsByCategory(categoryId);
};

export const createProduct = (productData) => {
    return model.createProduct(productData);
};

export const updateProduct = (id, updatedData) => {
    return model.updateProduct(id, updatedData);
};

export const updateProductPartial = (id, partialData) => {
    return model.updateProduct(id, partialData);
};

export const deleteProduct = (id) => {
    return model.deleteProduct(id);
};

export default {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    updateProductPartial,
    deleteProduct
};