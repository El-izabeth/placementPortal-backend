const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    roll: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneno: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{ timestamps: true })

module.exports = mongoose.model("User",UserSchema)  