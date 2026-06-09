//Schema or Structure of User Database


// Installation Command
// npm i jsonwebtoken bcryptjs nodemailer validator html-to-text cloudinary
// Note:

// crypto does NOT need to be installed because it is a built-in Node.js module.

//STEP 1 - IMPORT
const mongoose = require("mongoose")

const validator = require("validator")

const bcryptjs = require("bcryptjs")

const jwt = require("jsonwebtoken")

const crypto = require("crypto")

//STEP 2 = SCHEMA
const userSchema = new mongoose.Schema({
        name:{
            type: String,
            required:[true,"Please enter your name"],
            maxlength:[30,"Name cannot exceed 30 characters"]
        },
        email:{
            type: String,
            required:[true,"Please enter your Email_ID"],
            unique:true,
            lowercase:true,
            validate:[validator.isEmail,"Enter valid email"],
            maxlength:[30,"Email can't exceed 30 characters"]
        },
        password:{
            type: String,
            required:[true,"Please enter your password"],
            minlength:8,
            select:false
        },
        passwordConfirm:{
            type: String,
            required:[true,"Confirm password"],
            validate:{
                validator: function(el){
                    return el === this.password
                },
                message: "Passwords are not same"
            }
        },
        Phonenumber:{
            type: String,
            required:[true,"Please enter your Phone number"],
            match: [/^[0-9]{10}$/, "Enter valid phone number"]
            //  /^ means start and 10 means 0-9 must be 10 digit 
        },
        role:{
            type: String,
            enum: ["user","admin"],
            default: "user"
        }
    })