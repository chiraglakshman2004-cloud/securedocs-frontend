const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("🔐 Auth middleware - Token present:", !!token);
  console.log("🔐 Auth middleware - Auth header:", authHeader);

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default-secret-key");
    console.log("✅ Token decoded successfully:", decoded);
    
    // attach minimal user info to request
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    };
    console.log("👤 User attached to request:", req.user);
    return next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
