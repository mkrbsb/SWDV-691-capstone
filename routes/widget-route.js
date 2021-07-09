const express = require('express')
const router = express.Router()

const {getAll, getOne,} = require('../controller/widget-controller')


router.get("/widget-api", getAll)

// router.get("/widget/:api-key", getOne)

module.exports = router