const router = require("express").Router();
const adminController = require("../Controllers/adminController");
const { isAuth } = require("../middleware/auth");

router.get("/", adminController.getAllAdmins);

router.post("/repondavis", adminController.RepondeAvis);

router.post("/add", adminController.addAdmin);

router.get("/:id", adminController.RechercheAdminbyId);

router.delete("/:id", adminController.delteAdmin);

router.post("/update", isAuth, adminController.UpDateAdmin);

module.exports = router;
