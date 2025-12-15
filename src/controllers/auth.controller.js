import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, findUserByUsername } from "../models/User.js";

export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(422).json({ message: "Username and password are required" });
    }
    
    const existingUser = await findUserByUsername(username);
    if(existingUser) {
        return res.status(409).json({ message: "Username already exists" });    
    }

    const passwordHash = await bcrypt.hash(password, 10);
   
    const user = await createUser(username, passwordHash);
    if(!user) {
        return res.sendStatus(503);
    }
    res.status(201).json({id: user.id, username: user.username });
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(422).json({ message: "Username and password are required" });
    }

    const user = await findUserByUsername(username);
    if(!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    if(user && valid) {
        const token = jwt.sign({ id: user.id, username: user.username}, process.env.JWT_SECRET, { expiresIn: "1h" } );
        return res.json({ token });
    }
    res.status(401).json({ message: "Invalid credentials" });
};