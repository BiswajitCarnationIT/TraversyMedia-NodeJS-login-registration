//   /,/home

const express = require("express")
const {ensureAuthenticated} = require('../config/auth')

const router = express.Router()

// welcome page
router.get('/',(req,res)=>{
    //res.send('Welcome')
    res.render('welcome.ejs')  // welcome.ejs
})

// Dashboard
// router.get('/dashboard',(req,res)=>res.render('dashboard'))
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    name: req.user.name
  })
);
module.exports = router