const express = require('express')
const app = express()
//import
const  {HomeWeb} = require('../Controllers/UserController')
const {CheckedToken} = require('../Utils/Verify')
//Auth
const Auth = require('../Auth/Auth')

//router GET
app.get('/',HomeWeb)
//LoginPage
app.get('/login/:username',CheckedToken)



//RouterAuth
app.use(Auth)

module.exports = app