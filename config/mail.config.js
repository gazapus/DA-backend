const nodemailer = require("nodemailer");

let user = "";
let password = "";
let remitent = "";

try {
    var secret = require('./secret.config.js');
    user = secret.transporterUser;
    password = secret.trasporterPassword;
    remitent = secret.transporterRemitent;
} catch (err) {
    user = process.env.TRANSPORTER_USER;
    password = process.env.TRANSPORTER_PASSWORD;
    remitent = process.env.TRANSPORTER_REMITENT;
}

let transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    secure: false,
    auth: {
        user: user,
        pass: password,
    }
});

function messageBody(name, email, message) {
    return `
    <p>${message}</p>
    <br/>
    <em>${name}</em>
    <br/>
    <a href="mailto:${email}?Subject=Respuesta%20Decoraciones%20Alybell">Responder</a>
    `
}

module.exports = {
    transporter: transporter,
    remitent: remitent,
    messageBody: messageBody
};