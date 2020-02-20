const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        // select: false
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
        required: true
    },
    addedBy: {
        type: String,
    }
});



userSchema.methods.generateHash = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}


userSchema.methods.checkPassword = async function (password) {
    console.log('===password, this.password==', password, this.password);
    return bcrypt.compare(password, this.password)
}

userSchema.methods.createJsonWebToken = async function (object) {
    var token = jwt.sign(object, config.get("jsontoken"));
    return token;
}


//Export the model
module.exports = mongoose.model('User', userSchema);