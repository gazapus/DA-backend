const { authJwt } = require("../middleware");
let router = require('express').Router();
let newsController = require('../controllers/v1/news.controller');

router.get('/', newsController.find_all);
router.get('/get/:id', newsController.find_one);
router.post('/create', [authJwt.verifyToken], newsController.create);
router.put('/update/:id', [authJwt.verifyToken], newsController.update_one);
router.delete('/delete/:id', [authJwt.verifyToken], newsController.delete_one);
router.delete('/delete', [authJwt.verifyToken, authJwt.isAdmin], newsController.delete_all);

module.exports = router;