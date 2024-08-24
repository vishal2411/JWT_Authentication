const authService = require("../services/login");

/**
 * Handles user login requests.
 * @param {Object} req - Express request object containing the email and password in req.body
 * @param {Object} res - Express response object to send the response back to the client
 */
async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        const token = await authService.login(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: "Invalid email or password" });
    }
}

/**
 * Handles token refresh requests.
 * @param {Object} req - Express request object containing the old token in req.body
 * @param {Object} res - Express response object to send the new token back to the client
 */
async function refreshToken(req, res) {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }
        
        const newToken = await authService.refreshToken(token);
        res.status(200).json({ newToken });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {
    login,
    refreshToken
};
