import Property from '../models/property';
import mongoose from 'mongoose';
import db from '../database/db';
import dotenv from 'dotenv';
import formidable from 'formidable';
import  fs from 'fs';
import  _, { fromPairs } from 'lodash';
import cloudinary from '../services/cloudinary.config';
// import { prependListener } from 'process';

dotenv.config();

// new creation of property using cloudinary adn multer 
export  async function createProperty (req, res, next) {
    let { owner, price, city, phone } = req.body;
    console.log(req.file);
    try {
    let createdProduct = await new Property({
        owner,
        price,
        city,
        phone,
        // imagePath: req.file.url,
    });

    createdProduct.save();
        res.status(201).json({
        message: "Product added successfully",
        post: createdProduct
     });
        } catch (err) {
    res.status(500).json({
        message: "Creating a product failed!",
        });
    };
    
    }

//create a property

 //removed because of implementing fileupload

    // const property = new Property({
    //             _id: mongoose.Types.ObjectId(),
    //             owner: req.body.owner,
    //             price: req.body.price,
    //             state: req.body.state,
    //             city: req.body.city,
    //             phone: req.body.phone,
    //             address: req.body.address,
    //             url: req.body.url,
    //             dateCreated: new Date(),
    //         }) 
    //         db.collection('properties').insertOne(property, function (err, collection) {
    //             if (err) throw err
    //             console.log(property)
    //         })        
    //         return res.redirect('/public/pages/property.html')
            
    //         }
        
//     

export function postsByUser(req, res){
    Property.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .select('_id name address state created')
        .sort('_created')
        .exec((err, properties) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(properties);
        });
};


// Get all properties

export function getAllProperties(req, res) {
    // get current page from req.query or use default value of 1
    const currentPage = req.query.page || 1;
    // return 3 posts per page
    const perPage = 6;
    let totalItems;
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Property.find({ owner: regex})
                .sort({dateCreated:'asc'})
                .select('_id owner price city address state photo phone date')
                .then(properties =>{
                  return res.status(200).json({
                    success:true,
                    message:'Your search result is here ',
                    Property: properties,
                  })  
                }).catch(err=> {
                     res.status(500).json({
                    success: false,
                    message: 'Server error. Please try again.',
                    error: err.message,
                    forsearch:'found'
                    })
                })         
        
    } else {
        Property.find()            
            .sort({ dateCreated: 'asc' })
            .select('_id owner price city address state photo phone date')
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
export function updateProperty(req, res, next){
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let property = req.property;
        property = _.extend(property, fields);
        property.updated = Date.now();

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        property.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

//function for running regular expressions

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


//commented because of implementing file upload 


// export function updateProperty(req, res) {   
//     const property = new Property({
//         _id: req.params.id,
//         owner: req.body.owner,
//         price: req.body.price,
//         state: req.body.state,
//         city: req.body.city,
//         phone: req.body.phone,
//         address: req.body.address,
//         url: req.body.url,
//         dateCreated: req.body.dateCreated,
//     })
//      Property.updateOne({_id: req.params.id}, property).then(
//         () => {
//           res.status(201).json({
//             success: true,
//             message: 'Property  is updated',
//             Property: property,
//           });
//           return res.redirect('/public/pages/property.html');
//         }
//       )
//         .catch(err => {
//             res.status(500).json({
//                 success: false,
//                 message: 'Server error. Please try again.',
//                 error: err.message,
//             })
//         })
// }

// delete a property
export function deleteProperty(req, res) {    
    Property.deleteOne({_id: req.params.id})      
        .then(() => {
            res.status(200).json({
                success: true,
                message:'Property deleted well',               
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


export function postById(req, res, next, id) {
    Property.findById(id)
        .populate('postedBy', '_id name')
        .populate('postedBy', '_id name role')
        .select('_id price address created photo')
        .exec((err, property) => {
            if (err || !property) {
                return res.status(400).json({
                    error: err
                });
            }
            req.property = property;
            next();
        });
};
