const bcrypt = require("bcrypt");
const User = require("../models/user");
const {
    generateToken
} = require("../utils/jwtUtils");
const {verifyToken} = require("../utils/authMiddleware");

async function login(email, password) {
    try {
        const existingUser = await User.findOne({
            email
        });
        if (!existingUser) {
            throw new Error("User not found");
        }
        const isPasswordvalid = bcrypt.compare(password, existingUser.password);
        if (!isPasswordvalid) {
            throw new Error("Invalid email or password");
        }
        const token = generateToken(existingUser);
        return token;
    } catch (error) {
        throw new Error("Invalid email or password");
    }
}

async function refreshToken(oldToken){
    try{
        const decodeToken = verifyToken(oldToken);
        const user = User.findById(decodeToken.id);
        if(!user){
            throw new error("User not found");
        };
        const newToken = generateToken(user);
        return newToken;
    }catch(error){
        throw new error("Invalid token");
    }
}

module.exports = {
    login,
    refreshToken
}