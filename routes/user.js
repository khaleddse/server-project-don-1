const router = require('express').Router();
const User = require('../model/user.model');
router.route('/').get((req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error:' + err));

});

//c'est bon testé
router.post('/add', (req, res) => {
    const { nom, prenom, tel, email } = req.body;
    /** on crée une instance use  */
    const newUser = new User({
        nom,
        prenom,
        tel,
        email,
    });
    /** ici on enregistre le user dans la base de données */
    newUser.save()
        .then(() => res.json('user added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// ! Refactoring
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json('Error: ' + err));

});

// ! Refactoring
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('user deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// ! Refactoring
router.post('/update/:id', (req, res) => {

    const { id } = req.params
    const { nom, prenom, tel, email } = req.body

    const updatedUser = { nom, prenom, tel, email };

    User.findByIdAndUpdate(id, { $set: updatedUser }, { new: true })
        .then(updatedUser => {
            res.status(200).json({ message: 'User updated!', updatedUser })
        })
        .catch(err => res.status(400).json({ Error: err }));


});

module.exports = router;