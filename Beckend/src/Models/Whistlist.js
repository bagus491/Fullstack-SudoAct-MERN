const mongoose = require('mongoose')


const WhistlistSchema = new mongoose.Schema({
    username: String,
    ImageName: String,
    ImageType: String,
    ImageBuffer: Buffer,
    Count: String,
    Desc: String,
})



const whists = mongoose.model('whists',WhistlistSchema)


module.exports = whists


