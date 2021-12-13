// user/login  , user/logout

const express = require("express")

const router = express.Router()

// Login page
router.get('/login',(req,res)=>{
    //res.send('Login')
    res.render('login')
})

// Register page
router.get('/register',(req,res)=>{
    //res.send('register')
    res.render('register')
})

module.exports = router