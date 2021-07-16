const User = require("../model/users-model");
const Widget = require("../model/widget-model");
const bcrypt = require("bcrypt");
const { create_user_login } = require("../controller/login-controller");

const saltRounds = 10;

module.exports.getAll = (req, res) => {
  User.find({}, (err, data) => {
    res.json(data);
  });
};

module.exports.create = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const vPassword = req.body.vPassword;

  if (password !== vPassword) {
    return;
  }
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ err: { email: "email account already used" } });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email,
    password: hashedPassword,
    phone: req.body.phone,
    street_address1: req.body.street_address1,
    street_address2: req.body.street_address2,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
  });
  const result = await newUser.save().catch((err) => console.log(err));

  const newWidget = new Widget({
    _id: result._id,
  });

  await newWidget.save().catch((err) => console.log(err));

  // send back user and token
  create_user_login(req, res, result);
};

module.exports.update = async (req, res) => {
  const id = req.params.userId;
  if (req.body.email) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        res.status(400).json({ err: { email: "email account already used" } });
        return;
      }
      User.updateOne(
        { _id: id },
        { ...req.body },
        { new: true },
        (err, result) => {
          if (err) {
            console.log(err);
          }
          res.json({ user: "user updated" });
        }
      );
    });
  }
};

module.exports.deleteOne = async (req, res) => {
  const id = req.params.userId;
  const deteledUser = await User.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json({ user: "deleted user" });
  });
};

module.exports.getOne = (req, res) => {
  User.find({}, (err, data) => {
    console.log(data);
  });
  res.json(req.params);
};
