const router = require('express').Router();
const SubCatController = require('../Controllers/subgategorieControllers');

router.get('/', SubCatController.getAllSubcategorie);

router.post('/add/:id', SubCatController.addSubcategories);

router.get('/:id', SubCatController.RechercheSubParId);

router.delete('/:id', SubCatController.delteSubcategories);

router.post('/update/:id', SubCatController.UpDateSubcategorie);

module.exports = router;
