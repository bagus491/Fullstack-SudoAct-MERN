const mongoose = require('mongoose')
const url = 'Your DB'


 mongoose.connect(url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then((error,result) => {
    console.log(`Success Connect Db`)
})


