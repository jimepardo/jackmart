import { db } from "./firebase.js";

import { collection, getDocs, doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
    try {   
        const snapshot = await getDocs(productsCollection);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));        
    } catch (error) {
        console.error("Error fetching products: ", error);
    }
};

export const getProductById = async (id) => {
    try {
            const productRef = doc(productsCollection, id);
            const snapshot = await getDoc(productRef);
            return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
        } catch (error) {
            console.error(`Error fetching product by ID: ${id}`, error);
            throw error;
        }
};

export async function getProducts(categoryId) {
  const productsCollection = collection(db, "products");
    let q;
    if (categoryId) {
        q = query(productsCollection, where("category", "==", categoryId));
    } else {
        q = productsCollection;
    }
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return products;
};

export const createProduct = async (productData) => {
    try {
        const newProductRef = await addDoc(productsCollection, productData);
        return { id: newProductRef.id, ...productData };
    } catch (error) {
        console.error("Error creating product: ", error);
        throw error;
    }   
};

export const updateProduct = async (id, updatedData) => {
    try {
        const productRef = doc(productsCollection, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) {
            return false;
        }
        await setDoc(productRef, updatedData);
        return {id, ...updatedData};
    } catch (error) {
        console.error(`Error updating product with ID: ${id}`, error);
        throw error;
    }   
};

export const updateProductPartial = async (id, updatedData) => {
    try {
        const productRef = doc(productsCollection, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) {
            return false;
        }
        await updateDoc(productRef, updatedData);
        return {id, ...updatedData};
    } catch (error) {
        console.error(`Error updating product with ID: ${id}`, error);
        throw error;
    }   
};

export const deleteProduct = async (id) => {
    try {
        const productRef = doc(productsCollection, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) {
            return false;
        }   
        await deleteDoc(productRef);
        return true;
    } catch (error) {
        console.error(`Error deleting product with ID: ${id}`, error);
        throw error;
    }   
};