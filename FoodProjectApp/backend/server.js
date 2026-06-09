//to start the server

//import app package
const app = require("./app")

//import dotenv
const dotenv = require("dotenv")
//load env variables
dotenv.config({path : "./config/config.env"});

//start server
app.listen(process.env.PORT, ()=> {
    console.log(`Server started on PORT : ${process.env.PORT}`)
})