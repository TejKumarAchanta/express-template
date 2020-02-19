const bcrypt = require('bcryptjs');



module.exports.generateHash = function (password) {
    return new Promise(async (res, rej) => {
        const salt = await bcrypt.genSalt(10);
        res(await bcrypt.hash(password, salt));
    })
}


module.exports.checkPassword = function (password, hashed) {
    return new Promise(async (res, rej) => {
        res(bcrypt.compare(password, hashed))
    })
}