import passwordHash from 'password-hash'
import joi from 'joi'
import authentication from '../helpers/auth'
import Schema from '../helpers/inpuValidation'
import server from '../helpers/response'
import User from '../models/user'
import mongoose from 'mongoose'
import db from '../database/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'
dotenv.config()

//create a user
export function createUser(req, res) {
   

    bcrypt.hash(req.body.password, 10).then(
        (hash) =>{
    const user = new User({
                _id: mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                phone: req.body.phone, 
                address: req.body.address              
            });
           
            const emailExist =  User.findOne({email:req.body.email})
            
    
   
            if(!user){
                return res.status(401).json({
                    error: new Error('Plz enter details'),
                    message: "Plz enter details"
                });
            } else if(!user.password){
                return res.status(401).json({
                    error: new Error('Plz your password is required'),
                    message: "Plz your password is required"
                });
            }         
            else
            {
                db.collection('users').insertOne(user, function (err, collection) {
                    if (err) throw err   
                    console.log(user)                 
               })
                return res.status(201).json({
                    user: user,
                    success: true,
                    userId: user._id,
                    message: "Welcome beautiful user"
                })
             
                // return res.redirect('/public/pages/user.html');    
    
            }       

            })
        }

// get single User
export function getSingleUser(req, res) {
    // const id = req.params.userId
    User.findById({ _id: req.params.id })
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
    User.findOne({ email: req.body.email}).then((user) => {
        const {email,password} = req.body
        if (!email && !password ){            
             res.status(404).json({
                status: 'fail',
                error:new Error('plz input your details'),
                message: "No details entered"
                 });
                 return;     
           
        } else if(!user){
     
              return  res.status(404).json({
                status: 'fail',
                error: new Error ('User not found!'),
                message:'No email found,plz make sure you write it correctly'

            });
        }

        bcrypt.compare(req.body.password, user.password).then(
            (valid) => {

                if (!valid){ 
                    console.log(user)                 
                        return res.status(404).json({
                        status: 'fail',
                        error: new Error('Incorrect password!'),
                        message: `${user.firstname}, please use a correct password!`,
                        
                    });     
                }  
               
                const token = jwt.sign(
                    { userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h'});
                    

            //  return res.redirect('/public/pages/user.html');

                    res.status(200).json({
                    status: 'success',
                    userId: user._id,
                    token: token,
                    message:'Welcome beautiful user'
                });
               
              
            }
        ).catch(
            (error) => {
                res.status(500).json({
                    error: error
                });
            }
        );
    })
    .catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        });  
  }
  
  

// export function login(req, res) {
//     const { email, password } = req.body
//     const specificUser = model.userEmail(email)
//     if (!specificUser) {
//         return server(res, 400, 'No user with that email !')
//     } else {
//         // it's better to not make a lot of ifs
//         /// if (sth is wrong ) do action, return, break function
//         /// without if contiue with default code
//         /// if (!user.authentication.ok) break
//         /// continue normal code

//         if (passwordHash.verify(password, specificUser.password)) {
//             const {
//                 firstname, // merge to one operation from here
//                 lastname,
//                 PhoneNumber,
//                 email,
//                 password,
//                 isadmin,
//             } = specificUser
//             const user = {
//                 firstname,
//                 lastname,
//                 email,
//                 PhoneNumber,
//                 password,
//                 status: 'login',
//                 isadmin: specificUser.isadmin,
//                 id: specificUser.id,
//             } // to here
//             const token = authentication.encodeToken(user)
//             res.status(200).send({
//                 message: 'Logged in successfully',
//                 token,
//                 id: specificUser.id,
//                 firstname,
//                 lastname,
//                 PhoneNumber,
//                 email,
//                 status: user.status,
//                 isadmin,
//             })
//         } else {
//             res.status(400).send({ error: 'incorrect Password !' })
//         }
//     }
// }

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
        const getuser = User.userEmail(email)
        if (getuser) {
            getuser.password = User.setPassword(newpassword)
            return server(res, 201, 'password updated  succesfully')
        }
        return server(res, 400, "can't find user with that email")
    }
}
