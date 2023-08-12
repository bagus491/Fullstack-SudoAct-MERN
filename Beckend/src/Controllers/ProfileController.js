const {GetUser,getProfile,NewProfile} = require('../Utils/Verify')
const {jwt,secret} = require('../Utils/Index')


//dasbordProfile
const CheckProfile = async (req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //CheckUSER
            const DataOk = await GetUser(req.params.username)
            if(!DataOk){
                return res.status(401).json({msg : 'Not Authoirzation'})
            }

            //Validation TOken with users
            const decodedUser = decoded.username
            if(DataOk.username !== decodedUser){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //checkProfile
            const ProfileOk = await getProfile(decodedUser)
            if(!ProfileOk){
                return res.status(203).json({msg : 'No Content'})
            }

            res.status(200).json({msg : 'Success'})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


//postProfile
const ProfilePost = async(req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const dataOk = await GetUser(req.params.username)
            if(!dataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const decodedUser = decoded.username
            if(dataOk.username !== decodedUser){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const {MyJob,Desc} = req.body
            //users
            const newProfile = NewProfile(decodedUser,req.file,MyJob,Desc)

            //saveProfile
            const saveProfile = await newProfile.save()

            if(!saveProfile){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            res.status(201).json({msg : 'Success'})
        })
    }catch(error){
        return res.status(500).json({msg : 'Internal Server Error'})
    }
}



module.exports = {CheckProfile,ProfilePost}