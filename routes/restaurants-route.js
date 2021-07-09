const express = require('express')
const router = express.Router()

const {getAll, getOne, create, update, deleteOne} = require('../controller/restaurants-controller')


router.get("/restaurants", getAll)

router.get("/restaurants/:restaurantId", getOne)

router.post("/restaurants/like/:userId", (req,res)=>{res.send("post like route")})

router.post("/restaurants/dislike/:userId", (req,res)=>{res.send("post like route")})

router.delete("/restaurants/:restaurantId", deleteOne)


module.exports = router

