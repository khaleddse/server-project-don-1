const router = require('express').Router();
const adminController = require('../Controllers/adminController');

router.get('/', adminController.getAllAdmins);

router.post('/add', adminController.addAdmin);

router.get('/:id', adminController.RechercheAdminbyId);

router.delete('/:id', adminController.delteAdmin);

router.post('/update/:id', adminController.UpDateAdmin);

module.exports = router;
