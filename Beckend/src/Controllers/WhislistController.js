//call
const  {getWhist,NewWhist,UpdateWs,DeleteWs,GetUser, DeleteWs} = require('../Utils/Verify')
//getToken
const {jwt,secret} = require('../Utils/Index')


//getWhist
const GetWhislists = async (req,res) => {
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
            const arrayWhists = await getWhist()

            //filterArray ==> username
            const NewArray = arrayWhists.filter((e) => e.username === decodedUser)

            if(typeof NewArray === 'undefined' || NewArray.length < 1){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //DecodedFoto
            const ArrayMap = await Promise.all(
                NewArray.map((datas) => {
                    const {username,ImageType,ImageBuffer,Count,Desc} = datas

                    //decodedFoto
                    const ImageChange = ImageBuffer.toString('base64')
                    const ImagePath = `data:${ImageType};base64,${ImageChange}`

                    return {username,ImagePath,Count,Desc}
                })
            )

            res.status(200).json({msg : 'Success', data:ArrayMap})

        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//addWhist
const PostWhislist = async(req,res) => {
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

            //SCHEMA
            const PostWhist = NewWhist(decodedUser,req.file,Count,Desc)

            //savedPost
            const SaveWhist = await PostWhist.save()

            if(!SaveWhist){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            res.status(201).json({msg : 'Success'})
        })
    }catch(error){
        return res.status(401).json({msg: 'Not Authorization'})
    }
}

//UpdateWs
const UpdateWhislist = async(req,res) => {
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

            //checkWhist
            const arrayWhists = await getWhist()

            //findOne by id params
            const WhistOk = arrayWhists.find((e) => e._id === req.params.id)
            if(!WhistOk){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //destruction
            const {_id} = WhistOk
            const {username,Count,Desc} = req.body

            //doUpdate
            const doUpdate = await UpdateWs(_id,username,req.file,Count,Desc)
            if(!doUpdate){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            res.status(204).json({msg : 'Success'})
        })
    }catch(error){
        return res.status(401).json({msg: 'Not Authorization'})
    }
}


//deleteWs
const DeleteWhislist = async(req,res) => {
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


            //dataWhist
            const arrayWhists = await getWhist()

            //find
            const WhistOk = arrayWhists.find((e) => e._id === req.params.id)

            if(!WhistOk){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            //Delete
            const Deleted = await DeleteWs(WhistOk._id)

            if(!Deleted){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            res.status(204).json({msg : 'Success'})
        })
    }catch(error){
        return res.status(401).json({msg: 'Not Authorization'})
    }
}



module.exports = {GetWhislists,PostWhislist,UpdateWhislist,DeleteWhislist}