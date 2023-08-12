const mongoose = require('mongoose')


const NotepadSchema = new mongoose.Schema({
    username: String,
    Title: String,
    Paragraf: String,
    PostDate: String
})


const notepads = mongoose.model('notepads',NotepadSchema)


module.exports = notepads