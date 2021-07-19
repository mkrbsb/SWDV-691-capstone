const express = require("express");
const router = express.Router();

const { login, verify } = require("../controller/login-controller");

router.post("/login", login);

router.post("/login/verify", verify);

module.exports = router;
