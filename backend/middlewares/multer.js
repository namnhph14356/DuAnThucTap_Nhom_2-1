const multer = require("multer");   
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb)=>{
        if(!file.mimetype.startsWith("image")){
            cb("supported only image files!", false); 
        }
        cb(null, true);
}

exports.uploadImage = multer({storage, fileFilter})