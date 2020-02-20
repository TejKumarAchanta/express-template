const User = require('../models/User');
const utils = require('../utils/utils');
const { asyncHandler } = require('../middlewares/asyncHandler');


module.exports.getUsers = asyncHandler(async (req, res, next) => {

    let users = await User.find({}, { name: 1, email: 1, mobile: 1 });

    return res.status(200).json({
        error: false,
        data: users,
        count: users.length
    })

})



module.exports.addUser = async (req, res, next) => {


    try {
        const { name, password, email, mobile, role } = req.body;

        let userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(200).json({
                error: false,
                message: "User Already exists"
            })
        }

        let hashedPassword = await utils.generateHash(password);


        let userObject = {};
        userObject.name = name;
        userObject.password = hashedPassword;
        userObject.email = email;
        userObject.mobile = mobile;
        userObject.addedBy = req.user.id
        if (req.body.role) {
            userObject.role = role
        }

        await User.create(userObject);

        return res.status(200).json({
            error: false,
            message: "User Added"
        })
    }
    catch (e) {
        console.log('===err', e.stack.red);
        next(e)
    }

}