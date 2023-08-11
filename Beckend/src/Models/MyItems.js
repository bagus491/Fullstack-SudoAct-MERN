const mongoose = require('mongoose')


const NotepadSchema = new mongoose.Schema({
    Title: String,
    Paragraf: String,
    PostDate: String
})



const notepads = mongoose.model('users',NotepadSchema)


module.exports = notepads


