//call
const  {getWhist,NewWhist,UpdateWs,DeleteWs,GetUser,} = require('../Utils/Verify')
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
                return res.status(203).json({msg: 'No Content'})
            }

            //DecodedFoto
            const ArrayMap = await Promise.all(
                NewArray.map((datas) => {
                    const {_id,Title,ImageType,ImageBuffer,Count,Desc} = datas

                    //decodedFoto
                    const ImageChange = ImageBuffer.toString('base64')
                    const ImagePath = `data:${ImageType};base64,${ImageChange}`

                    return {_id,Title,ImagePath,Count,Desc}
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

            const dataOk = await GetUser(req.params.username)
            if(!dataOk){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            const decodedUser = decoded.username
            if(dataOk.username !== decodedUser){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            const {Title,Count,Desc} = req.body

            //SCHEMA
            const PostWhist = NewWhist(decodedUser,Title,req.file,Count,Desc)

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
            return res.status(401).json({msg: 'Not Authorization1'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg: 'Not Authorization2'})
            }

            const dataOk = await GetUser(req.params.username)
            if(!dataOk){
                return res.status(401).json({msg: 'Not Authorization3'})
            }

            const decodedUser = decoded.username
            if(dataOk.username !== decodedUser){
                return res.status(401).json({msg: 'Not Authorization4'})
            }

            //checkWhist
            const arrayWhists = await getWhist()
            

            //findOne by id params
            const WhistOk = arrayWhists.find((e) => e._id == req.params.id)
            console.log(WhistOk)
            
            if(!WhistOk){
                return res.status(401).json({msg: 'Not Authorization5'})
            }

            //destruction
            const {_id} = WhistOk
            const {Title,Count,Desc} = req.body

            //doUpdate
            const doUpdate = await UpdateWs(_id,decodedUser,Title,req.file,Count,Desc)
            if(!doUpdate){
                return res.status(401).json({msg: 'Not Authorization6'})
            }

            res.status(204).json({msg : 'Success'})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


//deleteWs
const DeleteWhislist = async(req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg: 'Not Authorization1'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg: 'Not Authorization2'})
            }

            const dataOk = await GetUser(req.params.username)
            if(!dataOk){
                return res.status(401).json({msg: 'Not Authorization3'})
            }

            const decodedUser = decoded.username
            if(dataOk.username !== decodedUser){
                return res.status(401).json({msg: 'Not Authorization4'})
            }


            //dataWhist
            const arrayWhists = await getWhist()

            //find
            const WhistOk = arrayWhists.find((e) => e._id == req.params.id)

            if(!WhistOk){
                return res.status(401).json({msg: 'Not Authorization5'})
            }

            //Delete
            const Deleted = await DeleteWs(WhistOk._id)

            if(!Deleted){
                return res.status(401).json({msg: 'Not Authorization6'})
            }

            res.status(204).json({msg : 'Success'})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}



module.exports = {GetWhislists,PostWhislist,UpdateWhislist,DeleteWhislist}