const router = require('express').Router();
const { body } = require('express-validator/check');
const userController = require('../Controllers/userController');
const { isAuth } = require('../middleware/auth');

/* router.put('/signup',[ 
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
],UserCatController.signup ); */

router.post('/login', userController.login);

router.post('/signup', userController.signup);

router.delete('/', isAuth, userController.deleteUser);

router.get('/', userController.getAllUsers);

/*router.post('/add',userController.addUser);

router.get('/:id',userController.FindUserById);*/

router.post('/update/:id', userController.UpDateUser);

module.exports = router;
