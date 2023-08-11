const mongoose = require('mongoose')


const ItemsSchema = new mongoose.Schema({
    ImageName: String,
    ImageType: String,
    ImageBuffer: Buffer,
    Count: String,
    Desc: String,
})


const myitems = mongoose.model('myitems',ItemsSchema)


module.exports = myitems