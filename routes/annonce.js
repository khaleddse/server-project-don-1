const router = require("express").Router();
const annonceController = require("../Controllers/annonceControllers");
const { isAuth } = require("../middleware/auth");

router.get("/", annonceController.getAllAnnonces);

//router.post('/add/:id/:UserID', upload.single('image'), addAnnonce);

router.get("/:id", annonceController.RechercheParID);

router.delete("/:id", isAuth, annonceController.delteAnnonce);

router.post("/update/:id", annonceController.UpDatedAnnonce);

router.post("/searchbytext", annonceController.SearchAnnonceByText);

module.exports = router;
