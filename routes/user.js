const router = require('express').Router();
const {body}=require('express-validator/check');
const UserCatController=require('../Controllers/userController');
const User = require('../model/user.model');

router.put('/signup',[ 
    body('email').isEmail().withMessage('Please enter a valid').custom((value,{req})=>{
        return User.findOne({email:value}).then(userDoc =>{
            if (userDoc){
                return Promise.reject('E-Mail address already exists!');
            }
        });
    })
    .normalizeEmail(),
    body('password')
    .trim().isLength({ min:5 }),
    body('nom')
    .trim()
    .not()
    .isEmpty()
],UserCatController.signup );
router.post('/login',UserCatController.login);
router.get('/', UserCatController.getAllUsers);

router.post('/add',UserCatController.addUser);

router.get('/:id',UserCatController.FindUserById);

router.delete('/:id',UserCatController.deleteUser);

router.post('/update/:id',UserCatController.UpDateUser);

module.exports = router;