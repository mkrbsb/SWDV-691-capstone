const express = require("express");
const router = express.Router();

const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
} = require("../controller/users-controller");

router.get("/users", getAll);

router.get("/users/:userId", getOne);

router.post("/users", create);

router.put("/users", update);

router.delete("/users/:userId", deleteOne);

module.exports = router;
