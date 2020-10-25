const router =require('express').Router();
let admin=require('../model/admin.model');
router.route('/').get((req,res)=>{
    admin.find()
    .then(admin =>res.json(admin))
    .catch(err=>res.status(400).json('Error:'+err));

});
router.route('/add').post((req,res)=>{
    const name=req.body.name;
    const prenom=req.body.prenom;
    const tel=Number(req.body.tel);
    const email=req.body.email;
    const grade=req.body.grade;

const newadmin= new admin({
    name,
    prenom,
    tel,
    email,
    grade,
});
newadmin.save()
.then(()=>res.json('Admin added'))
.catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req,res)=>{
    admin.findById(req.params.id)
    .then(admin=>res.json(admin))
    .catch(err =>res.status(400).json('Error: ' + err));

});
router.route('/:id').delete((req, res) => {
    admin.findByIdAndDelete(req.params.id)
      .then(() => res.json('admin deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
   admin.findById(req.params.id)
      .then(admin => {
        admin.name = req.body.name;
        admin.prenom = req.body.prenom;
        admin.tel = Number(req.body.tel);
        admin.grade = req.body.grade;
  
        admin.save()
          .then(() => res.json('admin updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;