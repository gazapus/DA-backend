const { verifySignUp } = require("../middleware");
const controller = require("../controllers/v1/auth.controller");
var router = require('express').Router();

router.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
router.post("/signin", controller.signin);

module.exports = router;