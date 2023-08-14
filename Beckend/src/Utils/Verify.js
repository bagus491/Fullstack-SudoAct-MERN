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

//updateUser 
const UpdateUser = async(username,password,email) => {
    return await Users.updateOne(
        {
            username: username,
        },
        {
            $set: {
                username,
                password,
                email
            }
        }
    )
}

//deletedUser
const DeleteUser = async(username) => {
    return await Users.deleteOne({username})
}


//modelsProfile
//checkProfile
const Profile = require('../Models/Profile')

const getProfile  = async(username) => {
    return await Profile.findOne({username})
}

//postProfile
const NewProfile = (username,file,myjob,desc) => {
    return new Profile({
        username,
        ImageName: file.filename,
        ImageType: file.mimetype,
        ImageBuffer: file.buffer,
        MyJob: myjob,
        Desc: desc,
    })
}

//updateProfile
const UpdateProfile = async (username,file,myjob,desc) => {
    return await Profile.updateOne(
        {
            username: username
        },
        {
            $set: {
                username,
                ImageName: file.filename,
                ImageType: file.mimetype,
                ImageBuffer: file.buffer,
                MyJob: myjob,
                Desc: desc,
            }
        }
    )
}

//updateName
const UpdateProfileName = async(username) => {
    return await Profile.updateOne(
        {
            username:username
        },
        {
            $set: {
                username,
            }
        }
    )
}

//deletedProfile
const DeleteProfile = async(username) => {
    return await Profile.deleteOne({username})
}


//modelsWhislist
const Whists = require('../Models/Whistlist')

//getWhists ==> all
const getWhist = async() => {
    return await Whists.find()
}

//postWhits
const NewWhist = (username,Title,file,Count,Desc) => {
    return new Whists({
        username,
        Title,
        ImageName: file.filename,
        ImageType: file.mimetype,
        ImageBuffer: file.buffer,
        Count,
        Desc,
    })
}

//updatewhist
const UpdateWs = async (id,username,Title,file,Count,Desc) => {
    return await Whists.updateOne(
        {
            _id : id
        },
        {
            $set: {
                username,
                Title,
                ImageName: file.filename,
                ImageType: file.mimetype,
                ImageBuffer: file.buffer,
                Count,
                Desc,
            }
        }
    )
}

//updateManyWhist
const UpdateManyWs = async(username) => {
    return await Whists.updateMany(
        {
            username: username
        },
        {
            $set: {
                username,
            }
        }
    )
}

//deletewhist
const DeleteWs = async(id) => {
    return await Whists.deleteOne({_id: id})
}

//deleteMany
const DeleteManyWs = async(username) => {
    return await Whists.deleteMany({username})
}


//ModelNotepads
const Notepad = require('../Models/Notepad')

//getAllNotepad==> all
const getPads = async() => {
    return await Notepad.find()
}

//getDetailsNotepad
const getDetailPad = async(id) => {
    return await Notepad.findOne({_id: id})
}

//postWhits
const NewPad = (username,Title,Paragraf,PostDate) => {
    return new Notepad({
        username,
        Title,
        Paragraf,
        PostDate
    })
}

//updatewhist
const UpdatePad = async (id,username,Title,Paragraf,PostDate) => {
    return await Notepad.updateOne(
        {
            _id : id
        },
        {
            $set: {
                username,
                Title,
                Paragraf,
                PostDate
            }
        }
    )
}

//update
const UpdateManyPad = async(username) => {
    return await Notepad.updateMany(
        {
            username: username
        },
        {
            $set: {
                username
            }
        }
    )
}

//deletewhist
const DeletePad = async(id) => {
    return await Notepad.deleteOne({_id: id})
}

//deleteMANY
const DeleteManyPad = async(username) => {
    return await Notepad.deleteMany({username})
}




module.exports = {
    VerifyUser,NewUser,GetUser,GetUserById,UpdateUser,DeleteUser,
    getProfile,NewProfile,UpdateProfile,DeleteProfile,getWhist,NewWhist,UpdateWs,UpdateManyWs,DeleteWs,DeleteManyWs,
    getPads,getDetailPad,NewPad,UpdatePad,UpdateManyPad,DeletePad,DeleteManyPad,UpdateProfileName}