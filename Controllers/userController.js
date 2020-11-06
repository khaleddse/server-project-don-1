const router = require('express').Router();
const User = require('../model/user.model');


exports.getAllUsers=async (req,res)=>{
    try{
        const Users = await User.find().populate('user')
        res.status(200).json({Users})
    } catch(err){
        res.status(400).json({err});
    }
};
//c'est bon testé
exports.addUser= async (req, res) => {

  const { nom, prenom, tel, email } = req.body;

  const newUser = new User({
      nom,
      prenom,
      tel,
      email,
  });

 try{
  const addedUser = await newUser.save()
  res.status(200).json({addedUser, message: 'user Added'});
} catch (err){
  res.status(400).json({ err });
}
};

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