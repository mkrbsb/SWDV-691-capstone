const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const { getAll } = require("../controller/favs-controller");

router.post("/favs", auth, getAll);

module.exports = router;
