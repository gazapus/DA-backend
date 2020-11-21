const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/v1/auth.controller");
var router = require('express').Router();

router.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail, authJwt.verifyToken, authJwt.isAdmin], controller.signup);
router.post("/signin", controller.signin);
router.get("/check", [authJwt.verifyToken], controller.authorizedAccess);
router.get("/check/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.authorizedAccess);

//router.post("/signup2", controller.signup);

module.exports = router;