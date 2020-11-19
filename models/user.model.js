let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: Boolean
})

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("User", schema);