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
      const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);

      return res.json({ token: token, isAuthenticated: true, user });
    }
    res.json({ err: { password: "password is incorrect" } });
  });
};

module.exports.verify = async (req, res) => {
  const token = req.body.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.user });

    res.json({ token: token, user, isAuthenticated: true });
  } catch (err) {
    // err
    console.log(err);
    res.json({ errors: { token: "Token is invalid" } });
  }
};

module.exports.create_user_login = (req, res, user) => {
  const newUser = user;
  const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);

  newUser.password = "";

  return res.json({ token: token, user: newUser, isAuthenticated: true });
};

module.exports.logout = (req, res) => {
  res.json({ logout: "You have been logged out." });
};
