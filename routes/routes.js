import express from 'express'
import PropertyCtrl, {
    createproperty,
    getAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty,
} from '../controllers/property'

const router = express.Router()

router.post('/api/v1/newproperty', createproperty)
router.get('/api/v1/properties', getAllProperties)
router.get('/api/v1/:propertyId', getSingleProperty)
router.patch('/api/v1/:propertyId', updateProperty)
router.delete('/api/v1/:propertyId', deleteProperty)

export default router
