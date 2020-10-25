const router =require('express');
let admin=require('../model/admin.model');
router.get('/',(req,res)=>{
    admin.find()
    .then(admin =>res.json(admin))
    .catch(err=>res.status(400).json('Error:'+err));

});
router.post('/add',(req,res)=>{
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
router.get('/:id',(req,res)=>{
    admin.findById(req.params.id)
    .then(admin=>res.json(admin))
    .catch(err =>res.status(400).json('Error: ' + err));

});
router.delete('/:id',(req, res) => {
    admin.findByIdAndDelete(req.params.id)
      .then(() => res.json('admin deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.post('/update/:id',(req, res) => {
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