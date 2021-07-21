const express = require("express");
const router = express.Router();

const { getAll, getOne } = require("../controller/tmdb-controller");

router.get("/movie", getAll);

router.get("/movie/:movieId", getOne);

module.exports = router;
