const router = require('express').Router();
const AvisController=require('../Controllers/avisController');


router.get('/', AvisController.getAllAvis);

router.post('/add',AvisController.addAvis);

router.delete('/:id',AvisController.deleteAvis);

module.exports = router;