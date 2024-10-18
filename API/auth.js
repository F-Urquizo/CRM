// File: middlewares/authenticateJWT.js
import jwt from "jsonwebtoken";

// Middleware to verify if the authorization token provided by the frontend is valid
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (authHeader) {
    // Extract the token from the header (expected format: "Bearer <token>")
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Invalid token:", err);
        return res
          .status(403)
          .json({ success: false, message: "Token inválido" });
      } else {
        // Attach the decoded token information to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
      }
    });
  } else {
    console.error("No token provided in the request");
    res
      .status(401)
      .json({ success: false, message: "No se proporcionó token" });
  }
};

export default authenticateJWT;
