import Property from '../models/property'
import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

//create a property
export function createproperty(req, res) {
    const property = new Property({
        _id: mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
    })
    return property
        .save()
        .then(newProperty => {
            return res.status(201).json({
                success: true,
                message: 'New property created successfully',
                property: newProperty,
            })
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            })
        })
}

// Get all propertieis
export function getAllProperties(req, res) {
    Property.find()
        .select('_id firstname lastname email adress')
        .then(allProperties => {
            return res.status(200).json({
                success: true,
                message: 'A list of all causes',
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

// get single cause
export function getSingleProperty(req, res) {
    const id = req.params.propertyId
    Property.findById(id)
        .then(singleProperty => {
            res.status(200).json({
                success: true,
                message: `More on ${singleProperty.firstname}`,
                Property: singleProperty,
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'This cause does not exist',
                error: err.message,
            })
        })
}

// update property
export function updateProperty(req, res) {
    const id = req.params.propertyId
    const updateObject = req.body
    Property.update({ _id: id }, { $set: updateObject })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Property  is updated',
                updateProperty: updateObject,
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            })
        })
}
// delete a property
export function deleteProperty(req, res) {
    const id = req.params.propertyId
    Property.findByIdAndRemove(id)
        .exec()
        .then(() =>
            res.status(204).json({
                success: true,
            })
        )
        .catch(err =>
            res.status(500).json({
                success: false,
            })
        )
}
