//  
//  Victor Ulloa
//  200597860
//  userController.js
//  2024-10-13
//

const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Controller to register a new user
async function registerUser(req, res) {
    const { username, password } = req.body; // Destructure the body

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await userModel.findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const newUser = await userModel.registerUser(username, password); // Use userModel to register
        res.status(201).json({ message: 'User registered successfully', user: { username: newUser.username } });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
}

// Controller to log in a user and issue JWT
async function loginUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await userModel.findUserByUsername(username);

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } else {
            // Failed login
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}

// Controller to log out a user
function logoutUser(req, res) {
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};