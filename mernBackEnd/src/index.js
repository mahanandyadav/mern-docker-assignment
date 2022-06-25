const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser');
// const mongoDBStore=require('connect-mongodb-session')(session)

const routes = require('./routes/routes')

require('./model/model');
require('./db/mongoose')

const app = express();
/*
const store=new mongoDBStore({
    uri:'mongodb+srv://mny:QTCdKtIouJJWbUYN@cluster0.zxfwd.mongodb.net/MernDocker?retryWrites=true&w=majority',
    collection:"mySessions"
})*/


app.use(cookieParser("secret shshs"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "*");
    // res.header("Access-Control-Allow-Credentials", "true")
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
        // return res.status(200).json({"message from mid":"successfull setup"});
        return res.status(200).json({ "message": "hello from index.js" });//call only next
    }
    next();
});
app.use(session({
    secret: "secret shshs",
    saveUninitialized:true,
    cookie:{
        // path:"http://localhost:3001/api/",
        // path:"/",
        httpOnly:false,
        // secure:true,
    },
    // store:store,
    resave: false,
    // unset:keep,
    // sameSite:'lax',
}))

app.use(routes);


const port = process.env.PORT || 3001;
app.listen((port), (error) => {
    console.log(`lisning on port ${port}`)
})