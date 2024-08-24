const User = require("../models/user");
const bcrypt = require("bcrypt");

/**
 * Creates a new user in the database.
 * @param {Object} userData - The data of the user to be created.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user (to be hashed).
 * @returns {Promise<Object>} - The newly created user document.
 */
async function createUser(userData) {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const createUser = new User({
        name,
        email,
        password: hashedPassword,
        role: "customer"
    });

    // Save the user to the database
    try {
        const savedUser = await createUser.save();
        return savedUser;
    } catch (error) {
        console.error('Error saving user:', error);
        throw new Error('Error saving user');
    }
}

module.exports = {
    createUser
};
