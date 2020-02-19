const User = require('../models/User');


module.exports.getUsers = async (req, res, next) => {

    let users = await User.find();

    return res.status(200).json({
        error: false,
        data: users,
        count: users.length
    })

}
