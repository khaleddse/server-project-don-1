const router = require('express').Router();
let Categ = require('../model/categorie.model');

router.route('/').get((req, res) => {
    Categ.find()
    .then(categs => res.json(categs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;

  const newUser = new Categ({name});

  newUser.save()
    .then(() => res.json('Categorie added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;