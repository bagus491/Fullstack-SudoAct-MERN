const express = require('express')
const app = express()
//import
const  {HomeWeb} = require('../Controllers/UserController')
const {CheckedToken,CheckedTokenLogin,CheckedTokenLogout} = require('../Utils/Verify')
//Auth
const Auth = require('../Auth/Auth')

//router GET
app.get('/',HomeWeb)
//LoginPage
app.get('/login',CheckedTokenLogin)

//dasbord
app.get('/dasbord/:username',CheckedToken)

//whislist
app.get('/whistlist/:username',CheckedToken)

//notepad
app.get('/notepad/:username',CheckedToken)


//setting
app.get('/setting/:username',CheckedToken)

//logout
app.get('/logout/:username',CheckedTokenLogout)

//RouterAuth
app.use(Auth)

module.exports = app