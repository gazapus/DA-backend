let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
    username: String,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
})

module.exports = mongoose.model("User", schema);