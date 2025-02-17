const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('cloudinary').v2;

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "waste_images", // Specify the folder in Cloudinary
        allowedFormats: ["jpg", "jpeg", "png"], // Corrected property name
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 } // 100 KB file size limit
});

module.exports = { upload };
