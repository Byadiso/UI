
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

//schema for the  database for properties
 
const propertySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: false,
    },

    phoneNumber: {
        type: Number,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        required: false,
    },
})
export default mongoose.model('Property', propertySchema)
