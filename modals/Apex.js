const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const apex = new Schema({
    uname: {
        type: String,
        required: true,
        unique: true
    }
})
const Apex = mongoose.model("student", apex);
module.exports = Apex