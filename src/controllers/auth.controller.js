import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import usersService from "../services/users.service.js";

export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(422).json({ message: "Username and password are required" });
    }

    const existingUser = await usersService.findUserByUsername(username);
    if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await usersService.createUser(username, passwordHash);
    if (!user) {
        return res.sendStatus(503);
    }
    res.status(201).json({ id: user.id, username: user.username });
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(422).json({ message: "Username and password are required" });
    }

    const user = await usersService.findUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
};