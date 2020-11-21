const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
//db.url = `mongodb+srv://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
db.url = dbConfig.URI;
db.products = require("./product.model.js")(mongoose);
db.networks = require("./network.model.js")(mongoose);
db.news = require("./news.model.js")(mongoose);
db.user = require("./user.model");

module.exports = db;