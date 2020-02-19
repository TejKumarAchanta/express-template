const asyncHandler = require('../middlewares/asyncHandler');
const utils = require('../utils/utils');

const User = require('../models/User');

module.exports.login = async (req, res, next) => {

    try {

        const { name, password } = req.body;

        let userData = await User.findOne({ name }, { password: 1, role: 1 })
        console.log("userData", userData);

        if (!userData) {
            return res.status(200).json({
                error: false,
                message: "User doesn't exists"
            })
        }
        let validPassword = await utils.checkPassword(password, userData.password)
        if (validPassword) {

            return res.status(200).json({
                error: false,
                message: "logged in succesfully",
                token: await userData.createJsonWebToken({ id: userData._id })
            })
        }
        else {
            return res.status(200).json({
                error: false,
                message: "Invalid credentials",
            })
        }


    }
    catch (e) {
        console.log('===', e);
        next(e)
    }
}



module.exports.register = async (req, res, next) => {

    try {
        const { name, password, email, mobile, role } = req.body;


        let userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(200).json({
                error: false,
                message: "User Already exists"
            })
        }

        let hashedPassword = await utils.generateHash(password)
        console.log("hashedPassword", hashedPassword);

        // let hashedPassword = await userExists.generateHash(password);

        let userObject = {};
        userObject.name = name;
        userObject.password = hashedPassword;
        userObject.email = email;
        userObject.mobile = mobile;
        if (req.body.role) {
            userObject.role = role
        }

        await User.create(userObject);

        return res.status(200).json({
            error: false,
            message: "user created"
        })
    }
    catch (e) {
        console.log('===err', e.stack.red);
        next(e)
    }
}