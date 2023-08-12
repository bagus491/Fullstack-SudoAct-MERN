const express = require('express')
const app = express()
const fs = require('fs')
//import
const  {HomeWeb,GetUpdateUser,GetDeleteUser} = require('../Controllers/UserController')
const {CheckedToken,CheckedTokenLogin,CheckedTokenLogout} = require('../Utils/Index')
//Auth
const Auth = require('../Auth/Auth')
//ProfileControllers
const {CheckProfile,ProfilePost,GetUpdateProfile,GetDeleteProfile} = require('../Controllers/ProfileController')
//Whistlist
const {GetWhislists,PostWhislist,UpdateWhislist,DeleteWhislist} = require('../Controllers/WhislistController')
//Notepad
const {GetPad,GetDetailPad,GetPostPad,GetUpdatePad,GetDeletePad}  = require('../Controllers/NotepadController')

const path = require('path')
//multer
const multer = require('multer')

//storage
const storage = multer.memoryStorage()

const Uploads = multer({storage: storage})


//router GET
app.get('/',HomeWeb)
//LoginPage
app.get('/login',CheckedTokenLogin)

//dasbord
app.get('/dasbord/:username',CheckedToken)
//Profile
app.get('/dasbord/profile/:username',CheckProfile)
//PostProfile
app.post('/dasbord/profile/:username',Uploads.single('Profile'),ProfilePost)

//whislistPage
app.get('/whistlist/:username',CheckedToken)
//WhistlistCard
app.get('/whistlist/card/:username',GetWhislists)
//postWhislist
app.post('/whistlist/card/:username',Uploads.single('Avatar'),PostWhislist)
//updateWhist
app.put('/whistlist/card/:username/:id',Uploads.single('Avatar'),UpdateWhislist)
//delete
app.delete('/whistlist/card/:username/:id',DeleteWhislist)

//notepad
app.get('/notepad/:username',CheckedToken)
//NotepadCard
app.get('/notepad/card/:username',GetPad)
//details
app.get('/notepad/card/detail/:username/:id',GetDetailPad)

//post
app.post('/notepad/card/:username',GetPostPad)

//put
app.put('/notepad/card/:username/:id',GetUpdatePad)

//delete
app.delete('/notepad/card/:username/:id',GetDeletePad)


//setting
app.get('/setting/:username',CheckedToken)

//settingupdate
app.put('/setting/update/user/:username',GetUpdateUser)
//settinguser
app.delete('/setting/delete/user/:username',GetDeleteUser)

//settingupdateProfile
app.put('/setting/update/profile/:username',GetUpdateProfile)
//settingdeleteProfile
app.delete('/setting/delete/profile/:username',GetDeleteProfile)

//logout
app.get('/logout/:username',CheckedTokenLogout)

//RouterAuth
app.use(Auth)

module.exports = app