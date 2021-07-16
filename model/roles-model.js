const Schema = require('mongoose').Schema
const mongoose = require('mongoose')

const RolesSchema = new Schema({
    admin:[{
        user:{type:Schema.Types.ObjectId, ref:"users"}
    }],
    user:[{
        user:{type:Schema.Types.ObjectId, ref:"users"}
    }]
})

module.exports = Roles = mongoose.model("roles", RolesSchema)