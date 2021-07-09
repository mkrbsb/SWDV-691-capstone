const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()
const routes = require('./routes/routes')
const mongoose = require("mongoose")


app.use(express.json())

app.use('/', routes)

mongoose.set('useCreateIndex', true)
if(process.env.NODE_ENV === "production") {
    const DB = process.env.DB_PRODUCTION
    mongoose
        .connect(DB, { useUnifiedTopology: true, useNewUrlParser: true })
        .catch(err => console.log(err))
        .then(()=> console.log("DB connected production"))
}
else{
    const DB = process.env.DB_DEVELOPMENT
    mongoose
        .connect(DB, { useUnifiedTopology: true, useNewUrlParser: true })
        .catch(err => console.log(err))
        .then(()=> console.log("DB connected development"))
}

app.listen(port, (err) =>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`working on localhost:${port}`)
    }
})