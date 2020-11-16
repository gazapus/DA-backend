const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`

db.products = require("./product.model.js")(mongoose);
db.networks = require("./network.model.js")(mongoose);
db.news = require("./news.model.js")(mongoose);
db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;