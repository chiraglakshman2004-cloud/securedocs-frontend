const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach minimal user info to request
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    };
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
