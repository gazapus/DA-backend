let router = require('express').Router();
let newsController = require('../controllers/v1/news.controller');

router.get('/', newsController.find_all);
router.get('/get/:id', newsController.find_one);
router.post('/create', newsController.create);
router.put('/update/:id', newsController.update_one);
router.delete('/delete/:id', newsController.delete_one);
router.delete('/delete', newsController.delete_all);

module.exports = router;