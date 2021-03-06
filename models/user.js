import mongoose from 'mongoose'
import  uniqueValidator from 'mongoose-unique-validator'

mongoose.Promise = global.Promise

//schema for thed database

const userSchema = new mongoose.Schema({
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
})

userSchema.plugin(uniqueValidator);


export default mongoose.model('User', userSchema)


