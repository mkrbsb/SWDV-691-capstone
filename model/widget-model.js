const Schema = require('mongoose').Schema
const mongoose = require('mongoose')
const {v4: uuidv4 }= require("uuid")


const WidgetSchema = new Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users",
        unique:true
    },
    api_key:{
        type:String,
        default: uuidv4(),
        unique:true
    },
    position:{
        type:String,
        default:"absolute"
    },
    right:{
        type:Number,
        default:0
    },
    bottom:{
        type:Number,
        default:0
    },
    width:{
        type:Number,
        default:400
    },
    height:{
        type:Number,
        default:400
    }
})

module.exports = Widget = mongoose.model("widget", WidgetSchema)