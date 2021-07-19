const jwt = require("jsonwebtoken");
require("dotenv").config;

module.exports.auth = (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ err: "No token, authorization denied" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.user) {
    next();
  } else {
    res.status(401).json({ err: "Token is not valid" });
  }
};
