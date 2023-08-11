




//homeWeb
const HomeWeb = (req,res) => {
    try{
        res.send('hello world')
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


//LoginPages
const LoginPages = (req,res) => {
    try{
        res.send('LoginPages')
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}










//export
module.exports = {HomeWeb,LoginPages}