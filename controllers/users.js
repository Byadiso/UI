import passwordHash from 'password-hash'
import joi from 'joi'
import authentication from '../helpers/auth'
import Schema from '../helpers/inpuValidation'
import server from '../helpers/response'
import User from '../models/user'
import mongoose from 'mongoose'
import db from '../database/db'

import dotenv from 'dotenv'
dotenv.config()

//create a user

export function createUser(req, res) {
    const user = new User({
                _id: mongoose.Types.ObjectId(),
                firstname: req.body. firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
               
            }) 
            db.collection('users').insertOne(user, function (err, collection) {
                if (err) throw err
                console.log(user)
                
            }) 
                
            return res.redirect('/public/pages/property_1.html')
            
            }

// export function createUser(req, res) {
//     const user = new user({
//         _id: mongoose.Types.ObjectId(),
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         password: req.body.password,
//         phoneNumber: req.body.phoneNumber,
//     })
//     if (error) {
//         res.status(400).send({ error: error.details[0].message })
//     } else {
//         // generate the id and pass it to a user
//         const id = parseInt(myModel.Users.length) + 1
//         const token = authentication.encodeToken({
//             email,
//             firstname,
//             lastname,
//             password,
//             address,
//             PhoneNumber,
//             userId: id,
//             status: 'Not login',
//             isadmin: 'false',
//         })
//         const checkemail = myModel.userEmail(email)
//         if (checkemail) {
//             return server(
//                 res,
//                 400,
//                 'email already exist please use another email!'
//             )
//         }
//         myModel.signupuser(req.body)

//         return user
//             .save()
//             .then(newUser => {
//                 return res.status(201).json({
//                     success: true,
//                     message: 'New user created successfully',
//                     user: newUser,
//                 })
//             })
//             .catch(error => {
//                 res.status(500).json({
//                     success: false,
//                     message: 'Server error. Please try again.',
//                     error: error.message,
//                 })
//             })
//     }
// }

// get single User
export function getSingleUser(req, res) {
    const id = req.params.userId
    User.findById(id)
        .then(singleUser => {
            res.status(200).json({
                success: true,
                message: `More on ${singleUser.firstname}`,
                User: singleUser,
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'This user doesnt exist',
                error: err.message,
            })
        })
}

// update users details
export function updateUser(req, res) {
    const id = req.params.userId
    const updateObject = req.body
    User.update({ _id: id }, { $set: updateObject })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'User details are updated',
                updateUser: updateObject,
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err
            })
        })
}

// Get all users
export function getAllUsers(req, res) {
    User.find()
        .select('_id firstname lastname email adress')
        .then(allUsers => {
            return res.status(200).json({
                success: true,
                message: 'A list of all users',
                user: allUsers,
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

// Login functions

export function login(req, res) {
    const { email, password } = req.body
    const specificUser = model.userEmail(email)
    if (!specificUser) {
        return server(res, 400, 'No user with that email !')
    } else {
        // it's better to not make a lot of ifs
        /// if (sth is wrong ) do action, return, break function
        /// without if contiue with default code
        /// if (!user.authentication.ok) break
        /// continue normal code

        if (passwordHash.verify(password, specificUser.password)) {
            const {
                firstname, // merge to one operation from here
                lastname,
                PhoneNumber,
                email,
                password,
                isadmin,
            } = specificUser
            const user = {
                firstname,
                lastname,
                email,
                PhoneNumber,
                password,
                status: 'login',
                isadmin: specificUser.isadmin,
                id: specificUser.id,
            } // to here
            const token = authentication.encodeToken(user)
            res.status(200).send({
                message: 'Logged in successfully',
                token,
                id: specificUser.id,
                firstname,
                lastname,
                PhoneNumber,
                email,
                status: user.status,
                isadmin,
            })
        } else {
            res.status(400).send({ error: 'incorrect Password !' })
        }
    }
}

//change password function

export function resetpassword(req, res) {
    const { email, newpassword } = req.body
    const { error, value } = joi.validate(
        {
            email,
            newpassword,
        },
        Schema.resetpassSchema
    )
    if (error) {
        res.status(400).send({ error: error.details[0].message })
    } else {
        const getuser = model.userEmail(email)
        if (getuser) {
            getuser.password = model.setPassword(newpassword)
            return server(res, 201, 'password updated  succesfully')
        }
        return server(res, 400, "can't find user with that email")
    }
}
