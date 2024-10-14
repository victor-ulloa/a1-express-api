//  
//  Victor Ulloa
//  200597860
//  userModel.js
//  2024-10-13
//

const bcrypt = require('bcryptjs');

const users = []; // This can be replaced with a database later.

async function registerUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), username, password: hashedPassword };
    users.push(user);
    return user;
}

async function findUserByUsername(username) {
    return users.find(user => user.username === username);
}

module.exports = {
    registerUser,
    findUserByUsername,
};