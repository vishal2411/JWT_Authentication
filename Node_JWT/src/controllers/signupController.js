const userService = require("../services/signup");
const { body, validationResult } = require('express-validator');

/**
 * Creates a new user.
 * @param {Object} req - The request object, containing the user data in req.body.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */

async function createUser(req, res) {
    // Validate input
    await body('email').isEmail().withMessage('Invalid email format').run(req);
    await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);
    await body('name').not().isEmpty().withMessage('Name is required').run(req);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userData = req.body;
        const user = await userService.createUser(userData);
        res.status(201).json({
            user: user,
            message: "User created successfully"
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

module.exports = {
    createUser
};
