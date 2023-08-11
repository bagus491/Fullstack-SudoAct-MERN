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

//verify
const {VerifyUser,NewUser} = require('../Utils/Verify')

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









module.exports = app