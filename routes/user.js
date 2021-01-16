const router = require("express").Router();
const { body } = require("express-validator/check");
const userController = require("../Controllers/userController");
const { isAuth } = require("../middleware/auth");

router.post("/login", userController.login);

router.post("/signup", userController.signup);

router.delete("/:id", userController.deleteUser);

router.get("/", userController.getAllUsers);

/*router.post('/add',userController.addUser);*/

router.get("/:id", userController.FindUserById);

router.post("/update", isAuth, userController.UpDateUser);

module.exports = router;
