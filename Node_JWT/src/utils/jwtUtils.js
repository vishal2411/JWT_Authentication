const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

/**
 * Generates a JWT token for the user.
 * @param {Object} user - User object containing _id, email, and role
 * @returns {String} - Generated JWT token
 */
function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

module.exports = {
    generateToken
};
