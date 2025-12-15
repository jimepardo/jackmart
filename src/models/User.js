import { db }   from "./firebase.js";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const usersCollection = collection(db, "users");

export const createUser = async (username, passwordHash) => {
    try {
        const docRef = await addDoc(usersCollection, { username, password: passwordHash });
        return { id: docRef.id, username };
    } catch (error) {
        console.error("Error creating user: ", error);
    }
};

export const findUserByUsername = async (username) => {
    try {
        const querySnapshot = query(usersCollection, where("username", "==", username));
        const snapshot = await getDocs(querySnapshot);
        if(!snapshot.empty) {
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error finding user by username: ", error);
    }
};