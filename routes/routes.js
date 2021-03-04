import express from 'express';
import multer from 'multer';
import propCtrl,{
    createProperty,
    getAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty,
    postsByUser,
} from '../controllers/property';


import userctrl, {
    createUser,
    getAllUsers,getSingleUser,
    login
} from '../controllers/users'
import auth from '../helpers/auth';

//added cause of uploading images 
import cloudinary from "../services/cloudinary.config";
import upload from '../services/multer';

// var upload = multer({ dest: 'uploads/' })


const router = express.Router();

// for property routers

router.post('/api/v1/property', upload.single('image'),  createProperty)
router.get('/api/v1/property', getAllProperties);
router.get('/api/v1/property/:id', getSingleProperty);
router.get('/api/v1/property/by/:userId', postsByUser);
router.put('/api/v1/property/:id', updateProperty);
router.delete('/api/v1/property/:id', deleteProperty);


// any route containing :postId, our app will first execute postById();
// router.param('postId', postById);


// for users routes

router.post('/api/v1/signup', createUser);
router.get('/api/v1/users', getAllUsers);
router.get('/api/v1/user/:id', getSingleUser);
router.post('/api/v1/login', login);
router.get('/api/v1/login',login);


export default router;