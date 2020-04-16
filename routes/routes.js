import express from 'express'
import PropertyCtrl, {
    createproperty,
    getAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty,
} from '../controllers/property'

import userctrl, {
    createUser,
    getAllUsers,getSingleUser,
    login
} from '../controllers/users'
import auth from '../helpers/auth'

const router = express.Router();

router.post('/api/v1/property', createproperty)
router.get('/api/v1/property', getAllProperties)
router.get('/api/v1/property/:id', getSingleProperty)
router.put('/api/v1/property/:id', updateProperty)
router.delete('/api/v1/property/:id', deleteProperty)

router.post('/api/v1/signup', createUser)
router.get('/api/v1/users', getAllUsers)
router.get('/api/v1/users/:id', getSingleUser)
router.post('/api/v1/login', login)
router.get('/api/v1/login',login)





export default router