const crypto = require('crypto');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

// set config for cloudinary
cloudinary.config({
    cloud_name: 'soarty',
    api_key: '669354898811388',
    api_secret: process.env.CLOUDINARY_SECRET
});

// create cloudinary storage object
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'freelance-network',
    allowedFormats: ['jpeg', 'jpg', 'png', 'pdf'],
    // create unique file name
    filename: function (req, file, cb) {
        let buf = crypto.randomBytes(16);
        buf = buf.toString('hex');
        let uniqFileName = file.originalname.replace(/\.jpeg|\.pdf|\.jpg|\.png/ig, '');
        uniqFileName += buf;
        cb(undefined, uniqFileName);
    }
});

// export cloudinary and storage
module.exports = {
    cloudinary,
    storage
}
