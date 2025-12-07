import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/products.router.js";

import { deleteProduct, modifiedProduct, createProduct, getProductById, getProducts } from "./callbacks.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", productsRouter);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to JackMart API" });
});

app.use((req, res, next) => {
    res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


/*
let [, , method, resource, ...params] = process.argv;

method = method.toUpperCase();
resource = resource.toLowerCase();

const [title, price, category] = params;

const productData = {
    title,
    price,
    category
};

async function processRequest(method, resource, productData) {

    const isResourcePresent = resource.startsWith("products");
    const id = parseInt(resource.split("/")[1]);

    if (isResourcePresent && resource !== "products" && resource.split("/").length === 2) {
        if (isNaN(id) || id <= 0) {
            console.error("Invalid ID. The product does not exist.");
            return;
        }

        switch (method) {
            case "GET":
                const productFound = await getProductById(id);
                if (productFound) {
                    console.log("Product found: ", productFound);
                    return { status: 200, data: productFound };
                }
                else {
                    console.error("Product not found.");
                    return { status: 404, message: "Product not found." };
                }
            case "PUT":
                console.log("Modifying product...");
                await modifiedProduct(id, productData);
                return { status: 200, message: "Product updated successfully." };
            case "DELETE":
                console.log("Deleting product...");
                await deleteProduct(id);
                return { status: 200, message: "Product deleted successfully." };

            default:
                console.error("Invalid method. Use GET, POST, PUT or DELETE.");
                return;
        }

    }
    if (resource === "products") {
        switch (method) {
            case "GET":
                console.log("Fetching all products...");
                const allProducts = await getProducts();
                return { status: 200, message: "Products retrieved successfully.", allProducts };
            case "POST":
                console.log("Creating product...");
                await createProduct(productData);
                return { status: 201, message: "Product created successfully." };
            default:
                console.error("Invalid method. Use GET or POST.");
                return;
        }
    }
    else {
        console.error("Invalid resource. Use 'products' or 'products/{id}'.");
        return;
    }
}

processRequest(method, resource, productData);*/