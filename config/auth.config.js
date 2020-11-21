let secretString = "";

try {
    var secret = require('./secret.config.js');
    secretString = secret.secret;
} catch (err) {
    secretString = process.env.SECRET;
}

module.exports = {
    secret: secretString
};