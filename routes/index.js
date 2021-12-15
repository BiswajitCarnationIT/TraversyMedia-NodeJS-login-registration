//   /,/home

const express = require("express")

const router = express.Router()

// welcome page
router.get('/',(req,res)=>{
    //res.send('Welcome')
    res.render('welcome.ejs')  // welcome.ejs
})

//
router.get('/dashboard',(req,res)=>res.render('dashboard'))

module.exports = router