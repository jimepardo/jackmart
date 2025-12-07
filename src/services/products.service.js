const products = [
    { id: 1, name: "Laptop", price: 999.99 },
    { id: 2, name: "Smartphone", price: 499.99 },
    { id: 3, name: "Tablet", price: 299.99 }
];

const getProducts = async () => {
    return products;
};

const getProductById = async (id) => {
    return products.find(product => product.id === id);
};

export default {
    getProducts,
    getProductById
};