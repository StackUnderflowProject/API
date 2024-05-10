var UserModel = require('../models/userModel.js');
var AdminModel = require('../models/adminModel.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
require("dotenv").config()

function isUserAuthorized(req, user) {
    if (req.userData.username === user.username) {return true;}
    if (req.isAdmin) {return true;}
    return false;
}

async function addAdminIfGatesOpen(user) {
    try {
        const admin = await AdminModel.findOne({}).exec();
        if (!admin) {
            console.log("Error: Failed to find admin");
            return;
        }
        if (admin.adminGates) {
            admin.users.push(user._id);
            await admin.save();
            console.log("Successfully added admin");
            return;
        } else {return;}
    } catch (err) {
        console.log("Error: AdminModel failed to fetch");
        return;
    }
}

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {
    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        UserModel.findOne({username: req.body.username}, function(er, user) {
            if (er) {
                return res.status(500).json({
                    message: 'Error when creating user.',
                    error: er
                });
            }
            if (user) {return res.status(500).json({message: "Error user with this username already exists."})}
            var user = new UserModel({
                username : req.body.username,
                password : req.body.password,
                email : req.body.email
            });
    
            bcrypt.hash(user.password, 10, function(err, hash){
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating user.',
                        error: err
                    });
                }
                user.password = hash;
                user.save(function (err, user) {
                    if (err) {
                        console.error('Error when creating user:', err);
                        return res.status(500).json({
                            message: 'Error when creating user',
                            error: err
                        });
                    }
                    addAdminIfGatesOpen(user);
                    return res.status(201).json(user);
                });
            });
        });
    },
    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findById(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            if (!isUserAuthorized(req, user)) {
                return res.status(403).json({message: 'Error you are not authorized to take this action.'});
            }
            
            user.remove();
            return res.status(204).json();
        });
    },

    uploadProfilePicture: async function (req, res, next) {
        if (req.file == undefined) {return res.status(500).json({message: "Internal error when uploading profile picture"})}
        try {
            const user = await UserModel.findById(req.userData.id).exec();
            if (!user) {
                const err = new Error('Not authorized, go back!');
                err.status = 400;
                throw err;
            }

            if (!isUserAuthorized(req, user)) {
                return res.status(403).json({message: 'Error you are not authorized to take this action.'});
            }

            // Delete existing profile picture if it exists
            if (user.image && user.image != "") {
                const imagePath = path.join(__dirname, '..', 'public', 'images', 'profile_pictures', user.image);
                await fs.promises.access(imagePath, fs.constants.F_OK);
                await fs.promises.unlink(imagePath);
                console.log('Image deleted successfully');
            }
    
            // Set new profile picture
            user.image = req.file.newName;
            const savedUser = await user.save();
            return res.json(savedUser);
        } catch (err) {
            console.error('Error when updating user:', err);
            return res.status(err.status || 500).json({
                message: err.message || 'Error when updating user.',
                error: err
            });
        }
    },

    login: function(req, res, next){
        UserModel.authenticate(req.body.username, req.body.password, function(err, user){
            if(err || !user){
                var err = new Error('Wrong username or paassword');
                err.status = 401;
                return next(err);
            }
            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username
                }, 
                process.env.JWT_SECRET, 
                {expiresIn: "1h"}
            );
            return res.status(200).json({token: token});
        });
    },
};
