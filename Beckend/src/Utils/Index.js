const {GetUser} = require('../Utils/Verify')
//jwt
const jwt = require('jsonwebtoken')
const secret = '!@#$%^&*()_+-=123}|45'

//chekced token
const CheckedToken = async (req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err) {
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const dataOk = await GetUser(req.params.username)
            if(!dataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //compare decodedToken with DataOk
            const decodedUser = decoded.username
            if(dataOk.username !== decodedUser){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            res.status(200).json({msg : 'Success'})
        })
    }catch(error) {
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//chekced token
const CheckedTokenLogin = async (req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err) {
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const decodedUser = decoded.username

            res.status(200).json({msg : 'Success', decodedUser})
        })
    }catch(error) {
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//checked Token logout
const CheckedTokenLogout = async (req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err) {
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const dataOk = await GetUser(req.params.username)
            if(!dataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //compare decodedToken with DataOk
            const decodedUser = decoded.username
            if(dataOk.username !== decodedUser){
                return res.status(401).json({msg: 'Not Authorization'})
            }
            res.clearCookie('token')
            res.status(200).json({msg : 'Success'})
        })
    }catch(error) {
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


module.exports = {jwt,secret,CheckedToken,CheckedTokenLogin,CheckedTokenLogout}