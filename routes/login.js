const router = require("express").Router();
const LoginController = require("../Controllers/login");

router.post("/login", LoginController.login);

module.exports = router;
