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

// Register Handel
router.post('/register',(req,res)=>{
    console.log(req.body)
    res.send('hello')
})

module.exports = router