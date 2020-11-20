const { authJwt } = require("../middleware");
var router = require('express').Router();
var productsController = require('../controllers/v1/product.controllers');

router.get('/', productsController.find_all);
router.get('/get/:id', productsController.find_one);
router.post('/create', [authJwt.verifyToken], productsController.create);
router.put('/update/:id', [authJwt.verifyToken], productsController.update);
router.delete('/delete/:id',[authJwt.verifyToken], productsController.delete);
router.delete('/delete', [authJwt.verifyToken, authJwt.isAdmin], productsController.delete_all);

module.exports = router;