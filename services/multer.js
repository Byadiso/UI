import multer from "multer";
import cloudinary  from "cloudinary" ;
import cloudinaryStorage from "multer-storage-cloudinary" ;



const storage =  cloudinaryStorage({    
    folder: "myProperty",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
    cloudinary: cloudinary,
    });
const upload = multer({ storage: storage })


export default upload ;


