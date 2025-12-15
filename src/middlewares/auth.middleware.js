import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token || !token.startsWith("Bearer ")) return res.sendStatus(401).json({ message: "Unauthorized - need token" });

  try {
    const extractedToken = token.split(" ")[1];
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.sendStatus(401).json({ message: "Invalid token" });
  }
};