//configure express and middleware

//1. import packages 
const express = require ("express")
const cors = require("cors")         //---> middleware package

//client -> app (goes through middleware) -> route -> response

//2. create express app
const app = express()
//this app object with control our entire backend. all the request from client will go through this object app

//3. configure middleware
app.use(cors())       //--> enabled communication b/w frontE and backE even on diff ports
app.use(express.json()) 
//server can't read json request body if we remove "express.json" line

//export the app
module.exports = app 
//in js we use file name as modules. now we can use this in another file by exporting