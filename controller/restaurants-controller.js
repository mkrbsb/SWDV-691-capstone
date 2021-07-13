const Restaurant = require('../model/restaurants-model')
const fetch = require('node-fetch')
require('dotenv').config()

module.exports.getAll = async (req,res) =>{
    const arr = ["one", "two", "three", "four"]
    const results = await Promise.all(arr.map(async (num, idx)=>{
        const res = await fetch(`https://api.yelp.com/v3/businesses/search?location=" + "austin" + "&price=${idx+1}&limit=50`,{
            mode: "no-cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer " + process.env.API_KEY
            },
            credentials: 'same-origin',
        })        
        const data = await res.json()
        return {[num]:data}
        })
    )
    res.json(results)
}

module.exports.getOne = (req,res) =>{
    // const id  = req.params.id
    // Restaurant.find({id}, async (err,restaurant) =>{
    //     if(restaurant){
    //         res.json(restaurant)
    //     }
    //     const newRestaurant = new Restaurant({
    //         id,
    //         data: req.body.data
    //     })
    //     newRestaurant.save().then(err => res.json({err:{message:[err]}}))""
    // })
}

module.exports.dislike = async (req,res) =>{
    const userId = req.params.userId
    const id = req.body.id
    const restaurant = await Restaurant.findById({_id:id}).catch(err => console.log(err))
        if(restaurant){
            if(restaurant.dislikes.filter(dislike => dislike.user.toString() === userId).length > 0){
                if(restaurant.likes.filter(like => like.user.toString() === userId).length > 0){
                    const index = restaurant.likes.findIndex(like => like.user.toString() === userId)
                    restaurant.likes.splice((index), 1)
                    restaurant.save()
                }
                const index = restaurant.dislikes.findIndex(dislike => dislike.user.toString() === userId)
                restaurant.dislikes.splice((index), 1)
                restaurant.save()
                res.json({message:"Restaurant dislike removed"})
            }
            else{
                restaurant.dislikes.unshift({user: userId})
                restaurant.save()
                res.json({message:"Restaurant dislike saved"})
            }
            
        }else{
        const newRestaurant = new Restaurant({
            _id:req.body.id,
            data: req.body,
            likes:[{user:userId}]
        })
        const data = await newRestaurant.save().catch(error => res.json({err:{message:error}}))
        res.json(data)
    }
}

module.exports.like = async (req,res) =>{
    const userId = req.params.userId
    const id = req.body.id
    const restaurant = await Restaurant.findById({_id:id}).catch(err => console.log(err))
        if(restaurant){
            if(restaurant.likes.filter(like => like.user.toString() === userId).length > 0){
                if(restaurant.dislikes.filter(dislike => dislike.user.toString() === userId).length > 0){
                    const index = restaurant.dislikes.findIndex(dislike => dislike.user.toString() === userId)
                    restaurant.dislikes.splice((index), 1)
                    restaurant.save()
                }
                const index = restaurant.likes.findIndex(like => like.user.toString() === userId)
                restaurant.likes.splice((index), 1)
                restaurant.save()
                res.json({message:"Restaurant like removed"})
            }
            else{
                restaurant.likes.unshift({user: userId})
                restaurant.save()
                res.json({message:"Restaurant like saved"})
            }
        }else{
        const newRestaurant = new Restaurant({
            _id:req.body.id,
            data: req.body,
            likes:[{user:userId}]
        })
        const data = await newRestaurant.save().catch(error => res.json({err:{message:error}}))
        res.json(data)
    }
}

module.exports.deleteOne = async (req,res) =>{
    const id = req.params.restaurantId
    console.log(id)
}

