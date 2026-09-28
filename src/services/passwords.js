const bcrypt = require("bcrypt");
async function hashPassword(pass){
    const passwordHash = await bcrypt.hash(pass, 10)
    return passwordHash;

}
module.exports = hashPassword;
