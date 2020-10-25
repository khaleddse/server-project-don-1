const router = require('express').Router();
let SubCateg = require('../model/subcategorie.model');
let Categ = require('../model/categorie.model');

router.route('/').get((req, res) => {
    SubCateg.find()
    .then(subCategs => res.json(subCategs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/:id').post((req, res) => {
  const name = req.body.name;


  const newUser = new SubCateg({name});

  Categ.findById(req.params.id)
  .then(categ => {
    categ.subcategs.push(newUser); 

    categ.save()
      .then(() => res.json('categ  updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
  newUser.save()
    .then(() => res.json('SubCategorie added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;