let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    imageURL: String,
    description: String,
    price: Number,
    shopURL: String,
},
    { timestamps: true }
);

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Product', schema)