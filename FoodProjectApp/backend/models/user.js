//Schema or Structure of User Database

//REQUIRED PACKAGES. (to run in terminal)

//1. crypto is a built in node js module that is used to generate secure random values like hashes or tokens
// we use crypto to generate tokens for password authentication, email verification, forgot password
// reset token  when user forgot password

// 2. jsonwebtoken is used to identify whether user is logged in or not. SO That user don't have to login every time 
// user carries that token with every request to access website. that token will expire depending on settings of website for jwt
// at time of login, protected routes, user sessions. it creates login authentication token

//3. bcryptjs is a packages used to hash password securely. never store password of user in form of normal password in database.
//so we hash or encyrpt it to prevent attacks from hackers

//4. nodemailer is used to send emails from node js application. so important notifications will come in email.

//5. validator used to check format of email. users can enter anything so we check whether it is valid in email field or not

//6. html-to-text = converts html content into plain text. ensures email compatibility across all devices.
//7. cloudinary -  cloud based service for storing images and videos

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