const router = require('express').Router();
let SubCateg = require('../model/subcategorie.model');
let Categ = require('../model/categorie.model');

//read all
router.get('/', async (req, res) => {
  const subCategories = await SubCateg.find().populate('annonces')
  res.status(200).json({subCategories})
});

//create annonce
router.post('/add/:id', (req, res) => {
  const { name } = req.body;

  const categID = req.params.id;


  const newSubCateg = new SubCateg({
    name,
    categID
  });

  Categ.findById(req.params.id)
    .then(categ => {
      categ.subcategs.push(newSubCateg);

      
      categ.save()
        .then(() => res.json('categ  updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
  newSubCateg.save()
    .then(() => res.json('SubCategorie added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Find by Id
router.get('/:id', (req, res) => {
  SubCateg.findById(req.params.id)
    .then(subcateg => res.json(subcateg))
    .catch(err => res.status(400).json('Error: ' + err));

});


//delete by ID
router.delete('/:id', (req, res) => {
  //1 =>bch n7awmou l id mta3  categ eli msajlin fih l subcateg
  SubCateg.findById(req.params.id)
    .then(subcateg => {
      //2=>ba3ad ma nalgouh nfass5ou l id mta3 l subcateg ml list des subcateg mta3  categ
      Categ.findById(subcateg.categID)
        .then(categ => {
          categ.subcategs = categ.subcategs.filter(el => el._id != req.params.id)
          //categ.subcategs.splice(categ.subcategs.indexOf(req.params.id,1));
          //3=> mba3ad nsajlou l categ 
          categ.save()
            .then(() => res.json('Categ  updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
        );
    }
    );

  //4=>mba3ad nfas5ou l Subcateg
  SubCateg.findByIdAndDelete(req.params.id)
    .then(() => res.json('Subcateg deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));


});


//update annoce
router.post('/update/:id', (req, res) => {

  const { id } = req.params
  const { name } = req.body

  const updatedSubcateg = { name };

  SubCateg.findByIdAndUpdate(id, { $set: updatedSubcateg }, { new: true })
    .then(updatedSubcateg => {
      res.status(200).json({ message: 'Subcateg updated!', updatedSubcateg })
    })
    .catch(err => res.status(400).json({ Error: err }));


});

module.exports = router;