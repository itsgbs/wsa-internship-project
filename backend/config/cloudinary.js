//this file configures and exports cloudinary so our app can securely upload and 
// manage images and videos in our cloud. URL will be stored in mongo db
const cloudinary = require("cloudinary")

cloudinary.config(
    {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = cloudinary