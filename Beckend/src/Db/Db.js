const mongoose = require('mongoose')
const url = 'mongodb://baguskalam:12345@ac-nbxj7gn-shard-00-00.hhg42vm.mongodb.net:27017,ac-nbxj7gn-shard-00-01.hhg42vm.mongodb.net:27017,ac-nbxj7gn-shard-00-02.hhg42vm.mongodb.net:27017/?ssl=true&replicaSet=atlas-vt47kx-shard-0&authSource=admin&retryWrites=true&w=majority'


 mongoose.connect(url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then((error,result) => {
    console.log(`Success Connect Db`)
})


