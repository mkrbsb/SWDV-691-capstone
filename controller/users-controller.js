const User = require("../model/users-model");
const Roles = require("../model/roles-model");
const Widget = require("../model/widget-model");
const bcrypt = require("bcrypt");
const { create_user_login } = require("../controller/login-controller");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

module.exports.getAll = (req, res) => {
    User.find({}, (err, data) => {
        res.json(data);
    });
};

module.exports.create = async (req, res, next) => {
    const email = req.body.user.email;
    const password = req.body.user.password;
    const vPassword = req.body.user.vPassword;

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
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email,
        password: hashedPassword,
        phone: req.body.user.phone,
        street_address1: req.body.user.street_address1,
        street_address2: req.body.user.street_address2,
        city: req.body.user.city,
        state: req.body.user.state,
        zipcode: req.body.user.zipcode,
    });

    const result = await newUser.save().catch((err) => console.log(err));

    const newWidget = new Widget({
        id: result._id,
    });

    await newWidget.save().catch((err) => console.log(err));

    // send back user and token
    create_user_login(req, res, result);
};

module.exports.update = async (req, res) => {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
    const userId = decoded.user;

    if (userId) {
        User.findOne({ _id: userId }, (err, user) => {
            if (err) {
                res.json(err);
                return;
            }
            const updateUser = req.body.user;
            if (!user) {
                res.status(400).json({ errors: { email: "No user found" } });
                return;
            }
            if (!updateUser.password) {
                delete updateUser.password;
                delete updateUser.vPassword;
            } else {
                if (updateUser.password !== updateUser) {
                    res.status(400).json({
                        errors: { password: "Passwords do not match" },
                    });
                }
            }

            delete updateUser.vPassword;
            User.updateOne(
                { _id: user._id },
                { ...updateUser },
                { new: true },
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    res.json({ message: "user updated" });
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
