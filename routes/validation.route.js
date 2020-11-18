const { authJwt } = require("../middleware");
const controller = require("../controllers/v1/validation.controller");
var router = require('express').Router();

router.get("/mod", [authJwt.verifyToken, authJwt.isModerator], controller.authorizedAccess);
router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.authorizedAccess);
router.get("/admin_or_mod", [authJwt.verifyToken, authJwt.isAdmin_or_mod], controller.authorizedAccess);

module.exports = router;