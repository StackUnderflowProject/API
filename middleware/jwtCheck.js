const jwt = require('jsonwebtoken');
require("dotenv").config()

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.decode(token , process.env.JWT_SECRET) // TODO secret 32B
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: "Invalid json web token",
            err: error
        });
    }
};