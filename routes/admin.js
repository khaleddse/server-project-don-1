const router = require('express').Router();
const Admin = require('../model/admin.model');
//const User = require('../model/user.model');
//const Personne = require('../model/personne.model');

router.get('/',(req, res) => {
    Admin.find()
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json('Error:' + err));

});


//creation user => user / Admin / superAdmin
router.post('/add', (req, res) => {
    const { nom, prenom, tel, email, grade } = req.body

    const newadmin = new Admin({
        nom,
        prenom,
        tel: Number(tel),
        email,
        grade,
    });

    newadmin.save()
        .then(createdUser => res.json({ message: 'Admin added', admin: createdUser }))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.get('/:id',(req, res) => {
    Admin.findById(req.params.id)
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json('Error: ' + err));

});
router.delete('/delete/:id',(req, res) => {
    Admin.findByIdAndDelete(req.params.id)
        .then(() => res.json('admin deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/update/:id',(req, res) => {
    const { id } = req.params
    const { nom, prenom, tel, email, grade } = req.body

    const updatedAdmin = { nom, prenom, tel, email, grade }

    Admin.findByIdAndUpdate(id, { $set: updatedAdmin }, { new: true })
        .then(updatedAdmin => {
            res.status(200).json({ message: 'admin updated!', updatedAdmin })
        })
        .catch(err => res.status(400).json({ Error: err }));
});



module.exports = router;


//les taches
/*  1.refacto avec l'example
    2.Async Await => promises
    3.installation Prettier avec ESLINT
*/