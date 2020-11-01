const { get } = require('./subcategorie');

const router = require('express').Router();
const categorieControllers=require('../Controllers/categorieControllers');

router.get('/',categorieControllers.getAllcategories);

router.post('/add',categorieControllers.addCategorie);


router.get('/:id', categorieControllers.RechercheCatParId);


router.delete('/:id', categorieControllers.deleteCategories);


router.post('/update/:id', categorieControllers.UpdateCategories);


module.exports = router;