const express = require('express')
const app = express()
//import
const  {HomeWeb} = require('../Controllers/UserController')


//router GET
app.get('/',HomeWeb)






module.exports = app