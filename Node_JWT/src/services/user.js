const User = require("../models/user");
const bcrypt = require("bcrypt");

async function getUsers(){
    const users = await User.find();
    return users;
};

module.exports = { getUsers };
