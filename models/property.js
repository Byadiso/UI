
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

//schema for the  database for properties
 
const propertySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: false,
    },
 
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    dateCreated: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: false,
    }
})
export default mongoose.model('Property', propertySchema)
