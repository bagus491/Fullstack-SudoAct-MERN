//NotepadVerify
const {getPads,getDetailPad,NewPad,UpdatePad,DeletePad,GetUser} = require('../Utils/Verify')
//getToken
const {jwt,secret} = require('../Utils/Index')


//getWhist
const GetPad = async (req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg: 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //checkdata
            const dataOk = await GetUser(req.params.username)
            if(!dataOk){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //verifydata
            const decodedUser = decoded.username
            if(dataOk.username !== decodedUser){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //arraywhists
            const arrayWhists = await getPads()

            //filterArray ==> username
            const NewArray = arrayWhists.filter((e) => e.username === decodedUser)

            if(typeof NewArray === 'undefined' || NewArray.length < 1){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            res.status(200).json({msg : 'Success', data:NewArray})

        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//getdetailswhist
const GetDetailPad = async(req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg: 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //checkdata
            const dataOk = await GetUser(req.params.username)
            if(!dataOk){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //verifydata
            const decodedUser = decoded.username
            if(dataOk.username !== decodedUser){
                return res.status(401).json({msg: 'Not Authorization'})
            }

           //checkData
           const CheckNote = await getDetailPad(req.params.id)

            if(!CheckNote){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //spreadOpertor
            const data = [...CheckNote]

            res.status(200).json({msg : 'Success',data })

        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//addWhist
const GetPostPad = async(req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg: 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            const dataOk = await GetUser()
            if(!dataOk){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            const decodedUser = decoded.username
            if(dataOk.username !== decodedUser){
                return res.status(401).json({msg: 'Not Authorization'})
            }   

            const {Title,Paragraf} = req.body

            //dateNow
            const PostDate = new Date()

            //SCHEMA
            const PostPad = NewPad(decodedUser,Title,Paragraf,PostDate)

            //savedPost
            const SavePad = await PostPad.save()

            if(!SavePad){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            res.status(201).json({msg : 'Success'})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//UpdateWs
const GetUpdatePad = async(req,res) => {
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

           //checkData
           const CheckNote = await getDetailPad(req.params.id)

            if(!CheckNote){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //destruction
            const {_id} = CheckNote
            const {Title,Paragraf} = req.body
            //dateNow
            const PostDate = new Date()

            //doUpdate
            const doUpdate = await UpdatePad(_id,decodedUser,Title,Paragraf,PostDate)
            if(!doUpdate){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            res.status(204).json({msg : 'Success'})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


//deleteWs
const GetDeletePad = async(req,res) => {
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


           //checkData
           const CheckNote = await getDetailPad(req.params.id)

            if(!CheckNote){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //Delete
            const Deleted = await DeletePad(CheckNote._id)

            if(!Deleted){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            res.status(204).json({msg : 'Success'})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}



module.exports = {GetPad,GetDetailPad,GetPostPad,GetUpdatePad,GetDeletePad}
