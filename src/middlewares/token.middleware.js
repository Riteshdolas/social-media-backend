import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(error);
  }
};

const optionalAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // attach user if token is valid
    } catch (err) {
      console.log("Invalid token, proceeding without user");
      req.user = null; // don't block, just set null
    }
  } else {
    req.user = null;
  }

  next(); // always continue
};

export default optionalAuthMiddleware;

export { authMiddleware, optionalAuthMiddleware };
