const express = require('express')
const app = express()
//import
const  {HomeWeb,LoginPages} = require('../Controllers/UserController')

//Auth
const Auth = require('../Auth/Auth')

//router GET
app.get('/',HomeWeb)
//LoginPage
app.get('/login',LoginPages)



//RouterAuth
app.use(Auth)

module.exports = app