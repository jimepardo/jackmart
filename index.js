import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.router.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import productsRouter from "./src/routes/products.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to JackMart API" });
});
app.use("/api/auth", authRouter);

app.use("/api/products", auth, productsRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});