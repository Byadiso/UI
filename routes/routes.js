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
    getAllUsers,
    login
} from '../controllers/users'

const router = express.Router();

router.post('/api/v1/property', createproperty)
router.get('/api/v1/property', getAllProperties)
router.get('/api/v1/property/:Id', getSingleProperty)
router.put('/api/v1/property/:Id', updateProperty)
router.delete('/api/v1/property/:Id', deleteProperty)

router.post('/api/v1/signup', createUser)
router.get('/api/v1/users', getAllUsers)
router.post('/api/v1/login', login)

export default router