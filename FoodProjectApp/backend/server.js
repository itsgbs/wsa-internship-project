//to start the server

//import app and database package
const app = require("./app")
const connectDatabase = require("./config/database")

//import dotenv
const dotenv = require("dotenv")
//load env variables
dotenv.config({path : "./config/config.env"});
//connect to db
connectDatabase();

//start server
app.listen(process.env.PORT, ()=> {
    console.log(`Server started on PORT : ${process.env.PORT}`)
})