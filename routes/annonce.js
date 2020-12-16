const router = require("express").Router();
const annonceController = require("../Controllers/annonceControllers");

router.get("/", annonceController.getAllAnnonces);

router.post("/add/:id/:UserID", annonceController.addAnnonce);

router.get("/:id", annonceController.RechercheParID);

router.delete("/:id", annonceController.delteAnnonce);

router.post("/update/:id", annonceController.UpDatedAnnonce);

router.post("/searchbytext", annonceController.SearchAnnonceByText);

module.exports = router;
