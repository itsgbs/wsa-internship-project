//Schema or Structure of User Database


// Installation Command
// npm i jsonwebtoken bcryptjs nodemailer validator html-to-text cloudinary
// Note:

// crypto does NOT need to be installed because it is a built-in Node.js module.

//STEP 1 - IMPORT
const mongoose = require("mongoose")

const validator = require("validator")

const bcrypt = require("bcryptjs")

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
        phoneNumber:{
            type: String,
            required:[true,"Please enter your Phone number"],
            match: [/^[0-9]{10}$/, "Enter valid phone number"]
            //  /^ means start and 10 means 0-9 must be 10 digit 
        },
        role:{
            type: String,
            enum: ["user","admin"],
            default: "user"
        },
        avatar:{
            public_id : String,
            url: String
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date
    },
    {timestamps:true}   //when you created or updated
    );

    //hash password 
    //pre("save") => runs before the user data is saved ( a mongodb function)
    //we will hash password using bcrypt function
    //we do not store password confirm field in our database . it is just used for validation
    userSchema.pre("save", async function(){
        if(!this.isModified("password")) return;

        this.password = await bcrypt.hash(this.password, 12) //=> hash password
        this.passwordConfirm = undefined

    })

    //password compare
    userSchema.methods.correctPassword = async function(
        candidatePassword, userPassword
    ){
        //at login time we enter normal pass which should be compared with hashed password stored inside database
        return await bcrypt.compare(candidatePassword, userPassword)
    }

    //checks whether user password was changed after getting JWT token
    //if yes , the old token is invalid and user must log in again
    userSchema.methods.changePasswordAfter = function(JWTTimestamp){
        if(this.passwordChangedAt){
            const changedTimestamp = parseInt(
                this.passwordChangedAt.getTime()/1000, 10
            )
            return JWTTimestamp < changedTimestamp
        }
    }

    //custom method to generate JWT token
    userSchema.methods.getJWTToken = function(){
        return jwt.sign(
            {id: this._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES}
        )
    }

    module.exports = mongoose.model("User", userSchema)