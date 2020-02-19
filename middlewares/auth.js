const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

module.exports.verifyToken = async (req, res, next) => {
    let token = req.headers.authtoken;

    if (!token) {
        return res.status(400).json({
            error: true,
            message: "Token required"
        })
    }
    else {
        var decoded = jwt.verify(token, config.get("jsontoken"));
        req.user = await User.findById(decoded.id);
        next();
    }

}



module.exports.authorize = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: true,
                message: "Unauthorized"
            })
        }
        next()
    }

}