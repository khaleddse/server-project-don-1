const router = require('express').Router();
const admin = require('../model/admin.model');

router.route('/').get((req, res) => {
    admin.find()
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json('Error:' + err));

});


//creation user => user / Admin / superAdmin
router.post('/add',(req, res) => {
    const { nom, prenom, tel, email, grade } = req.body

    const newadmin = new admin({
        nom,
        prenom,
        tel: Number(tel),
        email,
        grade,
    });

    newadmin.save()
        .then(createdUser => res.json({ message:'Admin added', admin: createdUser }))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/:id').get((req, res) => {
    admin.findById(req.params.id)
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/delete/:id').delete((req, res) => {
    admin.findByIdAndDelete(req.params.id)
        .then(() => res.json('admin deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    //Object Destructuring
    const { id, name, prenom, tel, email, grade } = req.body

    //create updatedAdmin
    const updatedAdmin = {
        name, prenom, tel, email, grade, Admin : {
          grade
        }
    }
    //2 update
    admin.findOneAndUpdate({_id: id}, { $set: updatedAdmin }, { new: true })
        .then(updatedAdmin => {
            console.log(updatedAdmin)
            res.status(200).json({ message: 'admin updated!' })
        })
        .catch(err => res.status(400).json({ Error: err }));



    // utiliser 
    /* admin.findById(id)
        .then(admin => {
            admin.save()
                .then(() => res.json('admin updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err)); */
});

//Example

router.get('/test/riadh', (req, res, next) => {
    res.send('Hello from test Api')
})
module.exports = router;


//les taches
/*  1.refacto avec l'example
    2.Async Await => promises
    3.installation Prettier avec ESLINT
*/