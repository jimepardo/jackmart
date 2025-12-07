import jwt from "jsonwebtoken";

export const loginUser = (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
        const token = jwt.sign({ username, date: Date.now() }, "your_jwt_secret", { expiresIn: "1h" }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Error generating token" });
            } else {
                return res.json({ token });
            }
        });
    }
    res.status(401).json({ message: "Invalid credentials" });
};