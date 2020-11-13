const router = require('express').Router();
const UserCatController=require('../Controllers/userController');


router.get('/', UserCatController.getAllUsers);

router.post('/add',UserCatController.addUser);

router.get('/:id',UserCatController.FindUserById);

router.delete('/:id',UserCatController.deleteUser);

router.post('/update/:id',UserCatController.UpDateUser);

module.exports = router;