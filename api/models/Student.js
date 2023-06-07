const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
    roll: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    programme: { type: String, required: true },
    branch: { type: String, required: true}
})

module.exports = mongoose.model("Student",StudentSchema)  