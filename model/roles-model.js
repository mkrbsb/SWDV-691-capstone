const Schema = require('mongoose').Schema

const RolesSchema = new Schema({
    admin:{
        type:String,
        default:"admin"
    },
    user={
        type:String,
        default:'user'
    }
})

module.exports = Roles = mongoose.model("roles", RolesSchema)