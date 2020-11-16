const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
    name: String
})

module.exports = mongoose.model("Role", schema);