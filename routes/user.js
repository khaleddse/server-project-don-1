const router =require('express').Router();
let user=require('../model/user.model');
router.route('/').get((req,res)=>{
    admin.find()
    .then(user =>res.json(user))
    .catch(err=>res.status(400).json('Error:'+err));

});
router.route('/add').post((req,res)=>{
    const name=req.body.name;
    const prenom=req.body.prenom;
    const tel=Number(req.body.tel);
    const email=req.body.email;
    const qte_donée=req.body.qte_donée;
    const qte_recué=req.body.qte_recué;

const User= new user({
    name,
    prenom,
    tel,
    email,
    qte_donée,
    qte_recué,
});
newadmin.save()
.then(()=>res.json('user added'))
.catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then(admin=>res.json(admin))
    .catch(err =>res.status(400).json('Error: ' + err));

});
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('user deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
   User.findById(req.params.id)
      .then(admin => {
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