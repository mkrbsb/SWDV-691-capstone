const User = require('../model/users-model')
const fecth = require('node-fetch')
require('dotenv').config()

module.exports.getAll = (req,res) =>{
    console.log(req.body.city + req.body.query)
    fecth("https://api.yelp.com/v3/businesses/search?location=" + "austin" + "&price=1&limit=50",{
        mode: "no-cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + process.env.API_KEY
        },
        credentials: 'same-origin',
    })        
    .then(res => res.json())
    .then(data => res.send(data))
}

module.exports.getOne = (req,res) =>{
    User.find({}, (err,data) =>{
        console.log(data)
    })
    res.json(req.params)
}

module.exports.dislike = async (req,res) =>{
}

module.exports.like = async (req,res) =>{
}

module.exports.deleteOne = async (req,res) =>{
    const id = req.params.restaurantId
    console.log(id)
}

