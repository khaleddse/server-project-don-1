const router =require('express').Router();
const User =require('../model/user.model');
router.route('/').get((req,res)=>{
    admin.find()
    .then(user =>res.json(user))
    .catch(err=>res.status(400).json('Error:'+err));

});

router.post('/add',(req,res)=>{
    const { nom, prenom, tel, email }=req.body;
    /** on crée une instance use  */
    const newUser = new User({
        nom,
        prenom,
        tel,
        email,
    });
    /** ici on enregistre le user dans la base de données */
    newUser.save()
      .then(()=>res.json('user added'))
      .catch(err => res.status(400).json('Error: ' + err));
});

// ! Refactoring
router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then(admin=>res.json(admin))
    .catch(err =>res.status(400).json('Error: ' + err));

});

// ! Refactoring
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('user deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// ! Refactoring
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(admin => {
      // !! Refactoring
      admin.name = req.body.name;
      admin.prenom = req.body.prenom;
      admin.tel = Number(req.body.tel);
      admin.grade = req.body.grade;

      User.save()
        .then(() => res.json('user updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
  
  module.exports = router;