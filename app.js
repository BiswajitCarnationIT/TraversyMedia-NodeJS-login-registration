const express = require("express")

const app = express();

const PORT = process.env.PORT || 5000

//Router
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))





app.listen(PORT,()=>{
    console.log(`Server started at port no ${PORT}`)
})