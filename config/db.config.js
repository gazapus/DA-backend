let UriString = "";

try {
  var secret = require('./secret.config.js');
  UriString = secret.URI;
} catch (err) {
  UriString = process.env.MONGOURI;
}

module.exports = {
  URI: UriString
};