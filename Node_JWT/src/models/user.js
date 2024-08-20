const mongoose = require("../configuration/dbConfig");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String, 
        enum:["admin","customer"], default:"customer"
    }
});

module.exports = mongoose.model("User", userSchema);