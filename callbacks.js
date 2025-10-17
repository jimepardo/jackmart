const deleteProduct = async (id) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log("Product deleted: ", data);
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}

const modifiedProduct = async (id, product) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log("Product modified: ", data);
    } catch (error) {
        console.error("Error modifying product:", error);
    }
}

const createProduct = async (product) => {
    try {
        const response = await fetch("https://fakestoreapi.com/products", {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("Product created: ", data);
    } catch (error) {
        console.error("Error creating product:", error);
    }
}

const getProductById = async (id) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!response.ok) {
            let errorMsg = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.text();
                if (errorData) {
                    try {
                        const jsonError = JSON.parse(errorData);
                        errorMsg += ` - ${jsonError.message || JSON.stringify(jsonError)}`;
                    } catch (error) {
                        errorMsg += ` - ${errorData}`;
                    }
                }
            } catch (e) {
                // Ignore error while reading error response
            }
            if (response.status === 404) {
                console.error("Product not found.");
                return null;
            }
            throw new Error(errorMsg);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching product by ID:", error.message);
        return null;
    }
}

const getProducts = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log("Products: ", data);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

export { deleteProduct, modifiedProduct, createProduct, getProductById, getProducts };