const express = require('express')
const app = express()


//jwt
const jwt = require('jsonwebtoken')
const secret = '!@#$%^&*()_+-=123}|45'

//bcrypt
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

//express validator
const {validationResult} = require('express-validator')

//passport 
const passport = require('passport')
const LocalPassport = require('passport-local').Strategy


//verify
const {VerifyUser,NewUser,GetUser,GetUserById} = require('../Utils/Verify')

passport.use(new LocalPassport({usernameField: "username"}, async (username,password,done) => {
    try{
        const DataOk = await GetUser(username)
        if(!DataOk){
            return done(null,false,{message: 'Not Authorization'})
        }
    
        const passOk = bcrypt.compareSync(password,DataOk.password)
        if(!passOk){
            return done(null,false,{message: 'Not Authorization'})
        }

    return done(null,DataOk)
    }catch(err){
    return done(err)
    }
}))

passport.serializeUser((DataOk,done) => {
    done(null,DataOk._id)
});

passport.deserializeUser(async(id,done) => {
    try{
        const checkId = await GetUserById(id)
        return done(null,checkId)
    }catch(error){
        return done(error)
    }
});

app.use(passport.initialize())
app.use(passport.session())


//register
const Register = async (req,res) => {
    try{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(401).send(error.array())
        }

        const {username,password,email} = req.body

        //bcrypt
        const passBcrypt = bcrypt.hashSync(password,salt)
        
        //addusers
        const UserNew = NewUser(username,passBcrypt,email)

        //saveusers
        const SaveUser = await UserNew.save()

        if(!SaveUser){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        res.status(201).json({msg : 'Success Register'})
        
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

app.post('/register',VerifyUser,Register)

const Login = (req,res) => {
    try{
        const {username} = req.body
        jwt.sign({username}, secret,{expiresIn: '1h'}, (err,token) => {
            if(err){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            res.cookie('token',token)
            res.status(200).json({msg : 'Sucess', token})
        })
    }catch(error){
        return res.status(500).json({msg : 'Internal Server Error'})
    }
}


app.post('/login',passport.authenticate('local'), Login)





module.exports = app