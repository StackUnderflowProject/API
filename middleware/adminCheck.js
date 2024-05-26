const AdminModel = require('../models/adminModel');

module.exports = (req, res, next) => {
    AdminModel.findOne({}, function(err, admins) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting admins.',
                error: err
            });
        }
        if (admins.users.includes(req.userData.id)) {
            req.isAdmin = true;
        }
        next();
    });
};