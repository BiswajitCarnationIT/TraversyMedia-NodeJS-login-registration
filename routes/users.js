// user/login  , user/logout

const express = require("express")

const router = express.Router()

// Encrypt password
const bcrypt = require("bcryptjs")

const passport = require('passport')

// User model
const User = require("../models/User")

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
        errors.push({msg:'Passwords do not match'})
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
        // res.send('pass')

        // Validation passed
        User.findOne({email: email})
        .then(user => {
            if(user){
                // User exists
                errors.push({msg:'Email is already registered'})
                res.render('register',{
                    errors:errors,
                    name:name,
                    email:email,
                    password:password,
                    password2:password2
                })
            }else{
                const newUser = new User({
                    name:name,
                    email,
                    password,
                })
                // console.log(newUser)
                // res.send('hello')

                //Hash Password
                bcrypt.genSalt(10,(error,salt)=>{
                    bcrypt.hash(newUser.password,salt,(error,hash)=>{
                        if(error) throw error;
                        // Set password to hashed
                        newUser.password = hash;
                        // Save to database
                        newUser.save()
                        .then(user => {
                            //res.send('Saved in DB')
                            req.flash('success_msg','you are now registered')
                            res.redirect('/users/login')
                        })
                        .catch(error => console.log(error))
                    })
                })

            }
        })
    }
})

// Login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

// Logiut Handle
router.get('/logout',(req,res) => {
    req.logout()  // passport middleware gives logout function
    req.flash('success_msg','You are logged out')
    res.redirect('/users/login')
})


module.exports = router