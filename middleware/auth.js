const jwt = require("jsonwebtoken");
require("dotenv").config;

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ err: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRECT);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ err: "Token is not valid" });
  }
};
