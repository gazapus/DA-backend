var router = require('express').Router();
var networkController = require('../controllers/v1/network.controller');

router.get('/', networkController.find_all);
router.get('/get/:id', networkController.find_one);
router.post('/create', networkController.create);
router.put('/update/:id', networkController.update);
router.delete('/delete/:id', networkController.delete);
router.delete('/delete', networkController.delete_all);

module.exports = router;