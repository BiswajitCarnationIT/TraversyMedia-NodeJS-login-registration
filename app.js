const express = require("express")

const expressLayout = require('express-ejs-layouts') // for ui
const mongoose = require("mongoose")

const app = express();

//
// mongoose.connect("mongodb://localhost:27017/Traversy-Media")
// const db = mongoose.connection
// db.on('error',(err)=>{
//     console.log(err)
// })

// db.once('open',()=>{  //otherwiae
//     console.log("Database connection Estublished")
// })

mongoose.connect("mongodb://localhost:27017/Traversy-Media")
.then(()=>console.log("MongoDB Connected...."))
.catch(err => console.log(err))


//EJS
app.use(expressLayout)
app.set('view engine','ejs')


// Body parser   -- to parse to JSON
app.use(express.urlencoded({extended: false}))



//Router
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

const PORT = process.env.PORT || 5000





app.listen(PORT,()=>{
    console.log(`Server started at port no ${PORT}`)
})


//ejs for ui