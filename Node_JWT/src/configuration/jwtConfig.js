const crypto = require("crypto");

//Generate a random Secret Key
const secretKey = crypto.randomBytes(32).toString("hex");

module.exports = {
    secretKey: secretKey
}