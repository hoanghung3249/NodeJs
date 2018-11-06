// UserModel.js

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String
    }
},{
    collection: "users"
})

module.exports = mongoose.model("User", UserSchema)