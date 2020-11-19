let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: Boolean
})

module.exports = mongoose.model("User", schema);