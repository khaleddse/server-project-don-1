const router = require('express').Router();
let Categ = require('../model/categorie.model');

router.get('/', (req, res) => {
  Categ.find()
    .then(categs => res.json(categs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
  const name = req.body.name;

  const newcateg = new Categ({ name });

  newcateg.save()
    .then(() => res.json('Categorie added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.get('/:id', (req, res) => {
  Categ.findById(req.params.id)
    .then((Categories) => res.json(Categories))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.delete('/:id', (req, res) => {
  Categ.findByIdAndDelete(req.params.id)
    .then(() => res.json('Categorie deleted '))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updateCateg = { name };
  Categ.findByIdAndUpdate(id, { $set: updateCateg }, { new: true })
    .then(updateCateg => {
      res.status(200).json({ message: 'Categorie updated !', updateCateg })
    })

    .catch(err => res.status(400).json({ Error: err }))

});


module.exports = router;