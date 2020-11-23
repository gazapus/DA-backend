const config = require("../../config/mail.config");

exports.send_mail = function (req, res) {

    let transporter = config.transporter;

    var mailOptions = {
        from: `"Decoraciones Alybell" <${config.remitent}>`,
        to: req.body.email,
        subject: 'Consulta de ' + req.body.name,
        html: config.messageBody(req.body.name, req.body.email, req.body.message)
    };

    transporter.sendMail(mailOptions)
        .then(response => {
            console.log(response);
            return res.status(200).send();
        })
        .catch(err => {
            console.log(console.error(err));
            return res.status(501).send();
        })
}