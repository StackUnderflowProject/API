var AdminModel = require('../models/adminModel.js');

function isUserAuthorized(req) {
    if (req.isAdmin) {return true;}
    return false;
}

module.exports = {

    list: function(req, res) {
        if (!isUserAuthorized(req)) {
            return res.status(403).json({
                message: 'Error you are not authorized to take this action.'
            });
        }
        AdminModel.findOne({}, function (err, admin) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting admins.',
                    error: err
                });
            }
            return res.json(admin);
        });
    },

    add: function (req, res) {
        var id = req.params.id;
        if (!isUserAuthorized(req)) {
            return res.status(403).json({
                message: 'Error you are not authorized to take this action.'
            });
        }
        AdminModel.findOne({}, function (err, admin) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting admins.',
                    error: err
                });
            }
            admin.users.push(id);
            admin.save(function (err, admin) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when adding user to admin list.',
                        error: err
                    });
                }
                return res.status(201).json({
                    message: "User successfully added to admin list."
                })
            });
        });
    },
    
    remove: function (req, res) {
        var id = req.params.id;
        if (!isUserAuthorized(req)) {
            return res.status(403).json({
                message: 'Error you are not authorized to take this action.'
            });
        }
        AdminModel.findOne({}, function(err, admin) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when removing user from admin list.',
                    error: err
                });
            }
            // remove user from admin list
            admin.users = admin.users.filter(item => item != id);
            admin.save(function (err, admin) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when removing user from admin list.',
                        error: err
                    });
                }
                return res.status(201).json({
                    message: "User successfully removed from admin list."
                })
            });
        });
    },

    isAmdin: function (req, res) {
        AdminModel.findOne({}, function(err, admin) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when checking isAdmin.',
                    error: err
                });
            }
            if (!admin) {
                return res.status(500).json({
                    message: 'No admin object found.',
                    error: err
                });
            }
            return res.status(200).json({isAdmin: admin.users.includes(req.userData.id)});
        });
    },

    openAdminGates: function (req, res) {
        if (!isUserAuthorized(req)) {
            return res.status(403).json({
                message: 'Error you are not authorized to take this action.'
            });
        }
        AdminModel.findOne({}, function(err, admin) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when opening the adminGates.',
                    error: err
                });
            }
            if (!admin.adminGates) {
                admin.adminGates = true;
                admin.save(function (err, admin) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when opening the adminGates.',
                            error: err
                        });
                    }
                    return res.status(201).json({message: "Gates are now opened"})
                });
            } else {
                return res.status(201).json({message: "Gates are now opened"})
            }
        });    
    },

    
    closeAdminGates: function (req, res) {
        if (!isUserAuthorized(req)) {
            return res.status(403).json({
                message: 'Error you are not authorized to take this action.'
            });
        }
        AdminModel.findOne({}, function(err, admin) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when opening the adminGates.',
                    error: err
                });
            }
            if (admin.adminGates) {
                admin.adminGates = false;
                admin.save(function (err, admin) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when opening the adminGates.',
                            error: err
                        });
                    }
                    return res.status(201).json({message: "Gates are now closed"})
                });
            } else {
                return res.status(201).json({message: "Gates are now closed"})
            }
        });    
    },
};    