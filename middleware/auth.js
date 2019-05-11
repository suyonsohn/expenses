const jwt = require("jsonwebtoken");
const privateKey = require("../config/keys").privateKey;

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Missing token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, privateKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token, authorization denied" });
  }
};
