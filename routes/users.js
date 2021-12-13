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
    // console.log(req.body)
    // res.send('hello')
    const { name,email,password,password2 } = req.body;
    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg:'Please fill in all fields'})
    }

    // Check password match
    if(password !== password2){
        errors.push({msg:'Passwords do not'})
    }

    // Check pass length
    if(password.length < 6){
        errors.push({msg:'password should be atleast 6 character'})
    }

    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })  
    }else{
        res.send('pass')
    }
})

module.exports = router