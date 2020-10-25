const router = require('express').Router();
let Annonce = require('../model/annonce.model');
let Subcateg = require('../model/subcategorie.model');

router.route('/').get((req, res) => {
    Annonce.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/:id').post((req, res) => {
  const objet = req.body.objet;
  const detail = req.body.detail;

  const newUser = new Annonce({objet,detail});

  Subcateg.findById(req.params.id)
  .then(subCateg => {
    subCateg.annonces.push(newUser); 

    subCateg.save()
      .then(() => res.json('Sybcateg  updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));

  newUser.save()
    .then(() => res.json('Annonce added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;