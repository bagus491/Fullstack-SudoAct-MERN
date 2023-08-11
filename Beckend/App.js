//first-setup
const express = require('express');
const app  = express();
const port =  5000;
//import
const  UserRouter = require('./src/Router/UserRouter')

//Two-setup
//middleware
const cors = require('cors')
app.use(cors())

//bodyparser
const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

//cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser('secret'))

//session
const Session  = require('express-session')
app.use(Session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: {maxAge: 6000}
}))

//morgan
const morgan = require('morgan')
app.use(morgan('dev'))

//express-rate-limiter
const limiter = require('express-rate-limit')
app.use(limiter({
    windowMS: 10 * 60 *1000,// 10minutes
    max: 100, // 100 request max
    message: {error: 'You Have Many Request'}
}))


//db
require('./src/Db/Db')

//middlewareRouter
app.use(UserRouter)


//middleware pembatasan
app.use('/',(req,res) => {
    res.status(404)
    res.send('404 NOT FOUND')
})

//first-setup
app.listen(port,() => {
    console.log(`server berjalan di port ${port}`)
});
