import Property from '../models/property'
import mongoose from 'mongoose'
import db from '../database/db'
import dotenv from 'dotenv'
dotenv.config()


//create a property

export function createproperty(req, res) {

    const property = new Property({
                _id: mongoose.Types.ObjectId(),
                owner: req.body.owner,
                price: req.body.price,
                state: req.body.state,
                city: req.body.city,
                phone: req.body.phone,
                address: req.body.address,
                url: req.body.url,
                dateCreated: new Date().tost,
            }) 
            db.collection('properties').insertOne(property, function (err, collection) {
                if (err) throw err
                console.log(property)
            })        
            return res.redirect('/public/pages/property.html')
            
            }
        
//           

// Get all propertieis
export function getAllProperties(req, res) {
    Property.find().sort({ dateCreated: 'asc' })
        .select('_id owner price city address state url phone dateCreated')
        .then(allProperties => {
            return res.status(200).json({
                success: true,
                message: 'A list of all properties',
                Property: allProperties,
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            })
        })
}

// get single property
export  function getSingleProperty(req, res) {        
        Property.findById({ _id: req.params.id }) 
    .then(singleProperty => {
            res.status(200).json({
                success: true,
                message: `More on ${singleProperty}`,
                Property: singleProperty,
            })
            
              
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'This property does not exist',
                error: err.message,
            })
        })
}

// update property
export function updateProperty(req, res) {   
    const property = new Property({
        _id: req.params.id,
        owner: req.body.owner,
        price: req.body.price,
        state: req.body.state,
        city: req.body.city,
        phone: req.body.phone,
        address: req.body.address,
        url: req.body.url,
        dateCreated: req.body.dateCreated,
    })
     Property.updateOne({_id: req.params.id}, property).then(
        () => {
          res.status(201).json({
            success: true,
            message: 'Property  is updated',
            Property: property,
          });
          return res.redirect('/public/pages/updated.html');
        }
      )
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            })
        })
}

// delete a property
export function deleteProperty(req, res) {    
    Property.deleteOne({_id: req.params.id})      
        .then(() => {
            res.status(200).json({
                success: true,
                message:'property deleted well',               
            });
            return res.redirect('/public/pages/property.html');            
          }
        )
        .catch(err =>
            res.status(500).json({
                success: false,
                error: err.message,
            })
        )
}
