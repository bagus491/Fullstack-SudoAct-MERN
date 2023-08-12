//verify
const {GetUser,UpdateUser,DeleteUser,DeleteProfile,UpdateManyPad,UpdateManyWs,DeleteManyPad,DeleteManyWs,UpdateProfileName} = require('../Utils/Verify')
//jwt
const {secret,jwt} = require('../Utils/Index')



//homeWeb
const HomeWeb = (req,res) => {
    try{
        res.send('hello world')
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


//updateUser
const GetUpdateUser = async (req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg: 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            const dataOk = await GetUser(req.params.username)
            if(!dataOk){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            const decodedUser = decoded.username
            if(dataOk.username !== decodedUser){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //destruction
            const {username,password,email} = req.body

            const UpdateNew = await UpdateUser(username,password,email)

            if(UpdateNew){
                await UpdateManyWs(username)
                await UpdateManyPad(username)
                await UpdateProfileName(username)
                res.status(204).json({msg : 'Success'})
            }else{
                return res.status(401).json({msg: 'Not Authorization'})
            }
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


//deleteUser
const GetDeleteUser = async (req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg: 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            const dataOk = await GetUser(req.params.username)
            if(!dataOk){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            const decodedUser = decoded.username
            if(dataOk.username !== decodedUser){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //delete
            const DeleteOk = await DeleteUser(decodedUser)
            if(DeleteOk){
                await DeleteProfile(decodedUser)
                await DeleteManyPad(decodedUser)
                await DeleteManyWs(decodedUser)
                res.status(204).json({msg : 'Success'})
            }else{
                return res.status(401).json({msg: 'Not Authorization'})
            }

        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}





//export
module.exports = {HomeWeb,GetUpdateUser,GetDeleteUser}