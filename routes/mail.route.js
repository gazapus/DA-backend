var router = require('express').Router();
var mailController = require('../controllers/v1/mail.controller');

router.post('/send', mailController.send_mail);

module.exports = router;