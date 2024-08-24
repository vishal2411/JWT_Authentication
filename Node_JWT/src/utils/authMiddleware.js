const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

/**
 * Middleware to authenticate JWT tokens.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    
    const [bearer, token] = authHeader.split(" ");
    
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }
    
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        
        req.user = user;
        next();
    });
}

/**
 * Verifies a JWT token and returns the decoded user if valid.
 * @param {String} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 * @throws {Error} - Throws error if token is invalid
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error("Invalid token");
    }
}

module.exports = { authenticateToken, verifyToken };
