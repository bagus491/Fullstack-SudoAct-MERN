




//homeWeb
const HomeWeb = (req,res) => {
    try{
        res.send('hello world')
    }catch(error){
        res.statu(500).json({msg : 'Internal Server Error'})
    }
}








//export
module.exports = {HomeWeb}