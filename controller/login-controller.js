const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/users-model");
require("dotenv").config();

module.exports.login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  User.findOne({ email }, async (err, user) => {
    if (err) {
      return;
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
          data: process.env.JWT_SECRET,
        },
        "secret"
      );

      return res.json({ token: token });
    }
    res.json({ err: { password: "password is incorrect" } });
  });
};

module.exports.verify = (req, res) => {
  const token = req.headers.token;

  User.findOne({ email }, async (err, user) => {
    if (err) {
      return;
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
          data: process.env.JWT_SECRET,
        },
        "secret"
      );

      return res.json({ token: token });
    }
    res.json({ err: { password: "password is incorrect" } });
  });
};

module.exports.create_user_login = (req, res, user) => {
  const newUser = user;
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
      data: process.env.JWT_SECRET,
    },
    "secret"
  );

  newUser.password = "";

  return res.json({ token: token, User: newUser });
};

module.exports.logout = (req, res) => {
  res.json({ logout: "You have been logged out." });
};
