const mongoose = require("mongoose")

const RecruiterSchema = new mongoose.Schema({
    recname: { type: String, required: true, unique: true },
    compname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    isOpen: { type: Boolean, default: false },
    password: { type: String, required: true }
})

module.exports = mongoose.model("Recruiter",RecruiterSchema)  