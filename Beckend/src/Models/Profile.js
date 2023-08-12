const mongoose  = require('mongoose')



const ProfileSchema = new mongoose.Schema({
    username: String,
    ImageName: String,
    ImageType: String,
    ImageBuffer: Buffer,
    MyJob: String,
    Desc: String,
})


const profiles = mongoose.model('profiles',ProfileSchema)



module.exports = profiles