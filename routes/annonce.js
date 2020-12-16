const router = require("express").Router();
const annonceController = require("../Controllers/annonceControllers");
const Annonce = require("../model/annonce.model");
const Subcateg = require("../model/subcategorie.model");
const User = require("../model/user.model");

router.get("/", annonceController.getAllAnnonces);

//router.post('/add/:id/:UserID', upload.single('image'), addAnnonce);

router.get("/:id", annonceController.RechercheParID);

router.delete("/:id", annonceController.delteAnnonce);

router.post("/update/:id", annonceController.UpDatedAnnonce);

router.post("/searchbytext", annonceController.SearchAnnonceByText);

module.exports = router;
