const express = require("express")

const expressLayout = require('express-ejs-layouts') // for ui

const app = express();

//EJS
app.use(expressLayout)
app.set('view engine','ejs')

//
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

//Router
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

const PORT = process.env.PORT || 5000





app.listen(PORT,()=>{
    console.log(`Server started at port no ${PORT}`)
})


//ejs for ui