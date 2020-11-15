var router = require('express').Router();
var productsController = require('../controllers/v1/product.controllers');

router.get('/', productsController.find_all);
router.get('/get/:id', productsController.find_one);
router.post('/create', productsController.create);
router.put('/update/:id', productsController.update);
router.delete('/delete/:id', productsController.delete);
router.delete('/delete', productsController.delete_all);

module.exports = router;