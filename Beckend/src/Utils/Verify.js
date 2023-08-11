//users model
const Users = require('../Models/Users')

const {check} = require('express-validator')


//validator
const VerifyUser = [
    check('username').custom(async(value) => {
        const Duplikat = await Users.findOne({username: value})
        if(Duplikat){
            throw new Error('Username Exist')
        }else{
            return true
        }
    }),
    check('password').isLength({min: 5}).withMessage('Password Length Min 5'),
    check('email').isEmail().withMessage('Email Not Valid')
]


//NewUsers
const NewUser = (username,password,email) => {
    return new Users({
        username,
        password,
        email
    })
}


//getUsers
const GetUser = async(username) => {
    return await Users.findOne({username})
}

//getUserById 
const GetUserById = async(id) => {
    return await Users.findOne({_id : id})
} 


module.exports = {VerifyUser,NewUser,GetUser,GetUserById}