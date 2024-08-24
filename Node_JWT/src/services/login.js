const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");

/**
 * Handles user login logic.
 * @param {String} email - User's email address
 * @param {String} password - User's password
 * @returns {String} - Generated JWT token
 * @throws {Error} - Throws an error if user is not found or password is invalid
 */
async function login(email, password) {
    try {
        // Find user by email
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new Error("User not found");
        }

        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        // Generate and return the token if the password is valid
        const token = generateToken(existingUser);
        return token;
    } catch (error) {
        // Customize error message based on the error type
        if (error.message === "User not found" || error.message === "Invalid email or password") {
            throw new Error("Invalid email or password");
        }
        // Handle any unexpected errors
        throw new Error("An error occurred during login");
    }
}

/**
 * Refreshes a JWT token.
 * @param {String} oldToken - Old JWT token to be refreshed
 * @returns {String} - New JWT token
 * @throws {Error} - Throws an error if the token is invalid or user is not found
 */
async function refreshToken(oldToken) {
    try {
        const decodedToken = verifyToken(oldToken);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            throw new Error("User not found");
        }

        const newToken = generateToken(user);
        return newToken;
    } catch (error) {
        throw new Error("Invalid token");
    }
}

module.exports = {
    login,
    refreshToken
};
