const Schema = require('mongoose').Schema
const mongoose = require('mongoose')

const RestaurantsSchema = new Schema({
    _id:{
        type:String
    },
    data:{
        type:Object
    },
    likes:[
        {
            user:{type:Schema.Types.ObjectId, ref:"users"}
        }
    ],
    dislikes:[
        {
            user:{type:Schema.Types.ObjectId, ref:"users"}
        }
    ],
})

module.exports = Restaurants = mongoose.model("restaurants", RestaurantsSchema)

//no changes or issues with the code. Great job! 
