const express = require('express')
const app = express()
//import
const  {HomeWeb,LoginPages} = require('../Controllers/UserController')


//router GET
app.get('/',HomeWeb)
//LoginPage
app.get('/login',LoginPages)





module.exports = app