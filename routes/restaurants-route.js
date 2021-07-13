const express = require('express')
const router = express.Router()

const {getAll, getOne, dislike, like, deleteOne} = require('../controller/restaurants-controller')


router.get("/restaurants", getAll)

router.get("/restaurants/:restaurantId", getOne)

router.post("/restaurants/like/:userId", like)

router.post("/restaurants/dislike/:userId", dislike)

router.delete("/restaurants/:restaurantId", deleteOne)


module.exports = router

