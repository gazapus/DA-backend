const { authJwt } = require("../middleware");
const controller = require("../controllers/v1/user.controller");
var router = require('express').Router();

router.get("/all", [authJwt.verifyToken, authJwt.isAdmin], controller.find_all);
router.delete("/delete/:id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.verifyAdminQuantity], controller.delete_one);

module.exports = router;