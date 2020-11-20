const { authJwt } = require("../middleware");
var router = require('express').Router();
var networkController = require('../controllers/v1/network.controller');

router.get('/', networkController.find_all);
router.get('/get/:id', networkController.find_one);
router.post('/create', [authJwt.verifyToken], networkController.create);
router.put('/update/:id', [authJwt.verifyToken],  networkController.update);
router.delete('/delete/:id', [authJwt.verifyToken],  networkController.delete);
router.delete('/delete', [authJwt.verifyToken, authJwt.isAdmin], networkController.delete_all);

module.exports = router;