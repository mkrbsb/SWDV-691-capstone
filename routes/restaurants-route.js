const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getAll,
  getOne,
  dislike,
  like,
  deleteOne,
  LandingPage,
} = require("../controller/restaurants-controller");

router.get("/restaurants", getAll);

router.get("/restaurants/landingpage/:city", LandingPage);

router.get("/restaurants/:restaurantId", getOne);

router.post("/restaurants/like/:userId", auth, like);

router.post("/restaurants/dislike/:userId", auth, dislike);

router.delete("/restaurants/:restaurantId", deleteOne);

module.exports = router;
