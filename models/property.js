import moment from 'moment'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

class Property {
    constructor() {
        this.properties = []
    }

    findall(query = {}) {
        if (query.type) {
            const propertytype = this.properties.find(
                oneproperty => oneproperty.type === query.type
            )
            return propertytype
        }
    }

    findOne(PropertyId) {
        const foundproperty = this.properties.find(
            property => property.id === parseInt(PropertyId)
        )
        return foundproperty
    }

    findPro(propertyid) {
        const property = this.properties.findIndex(
            property => property.id === parseInt(propertyid)
        )
        return property
    }

    deletePro(id) {
        const findproperty = this.findOne(id)
        const indexof = this.properties.indexOf(findproperty)
        const deletedproperty = this.properties.splice(indexof, 1)
        return deletedproperty
    }

    createPro(data, userInfo, url) {
        const inserProp = {
            id: this.properties.length + 1,
            created_On: moment.utc().format('DD-MM-YYYY HH:mm:ss'),
            owner: userInfo.id,
            ownerPhoneNumber: userInfo.PhoneNumber,
            ownerEmail: userInfo.email,
            status: 'available',
            type: data.type,
            city: data.city,
            address: data.address,
            price: data.price,
            image_url: url.image_url,
        }
        this.properties.push(inserProp)
        return inserProp
    }
}

/*
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
    required: true,
  },

  phoneNumber: {
    type: number,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    required: true,
  },
});
export default mongoose.model('Cause', causeSchema);
*/
//schema for thed database

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
