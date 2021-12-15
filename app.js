const express = require("express")

const expressLayout = require('express-ejs-layouts') // for ui
const mongoose = require("mongoose")
const flash = require("connect-flash")  // flash message - stored in a session
const session = require('express-session')
const passport = require("passport")

const app = express();

// Passport config
require('./config/passport')(passport)

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
app.use(express.urlencoded({extended: false}))  // we can get data forn 

// Express session middleware 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))

// Passport middle ware
app.use(passport.initialize())
app.use(passport.session())

// connect flash
app.use(flash());

// Global variable
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})


//Router
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

const PORT = process.env.PORT || 5000





app.listen(PORT,()=>{
    console.log(`Server started at port no ${PORT}`)
})


//ejs for ui