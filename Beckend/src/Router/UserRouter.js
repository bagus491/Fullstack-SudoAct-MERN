const express = require('express')
const app = express()
//import
const  {HomeWeb} = require('../Controllers/UserController')
const {CheckedToken,CheckedTokenLogin,CheckedTokenLogout} = require('../Utils/Index')
//Auth
const Auth = require('../Auth/Auth')
//ProfileControllers
const {CheckProfile,ProfilePost} = require('../Controllers/ProfileController')
//Whistlist
const {GetWhislists,PostWhislist,UpdateWhislist,DeleteWhislist} = require('../Controllers/WhislistController')

//multer
const multer = require('multer')
//storage
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, '../public/Image/Uploads/Profile')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})

//storageWhislist
const WsStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, '../public/Image/Uploads/Whislist')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})

const Uploads = multer({storage})
//UploadsWs
const UploadsWs = multer({storage: WsStorage})

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
app.post('/whistlist/card/:username',UploadsWs.single('Avatar'),PostWhislist)
//updateWhist
app.put('/whistlist/card/:username/:id',UploadsWs.single('Avatar'),UpdateWhislist)
//delete
app.delete('/whistlist/card/:username/:id',DeleteWhislist)

//notepad
app.get('/notepad/:username',CheckedToken)


//setting
app.get('/setting/:username',CheckedToken)

//logout
app.get('/logout/:username',CheckedTokenLogout)

//RouterAuth
app.use(Auth)

module.exports = app