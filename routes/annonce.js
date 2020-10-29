const router = require('express').Router();
const annonce = require('../model/annonce.model');
let Annonce = require('../model/annonce.model');
const subCateg = require('../model/subcategorie.model');
let Subcateg = require('../model/subcategorie.model');

//read all
router.route('/').get((req, res) => {
    Annonce.find()
    .then(annonces => res.json(annonces))
    .catch(err => res.status(400).json('Error: ' + err));
});

//create annonce
  router.post('/add/:id', (req, res) => {
  const { objet, detail } = req.body;

  subCategID=req.params.id;

  const newAnnonce = new Annonce({
    objet,
    detail,
    subCategID
  });

  Subcateg.findById(req.params.id)
  .then(subCateg => {
    subCateg.annonces.push(newAnnonce._id); 
   // subCateg.annonces.push(newAnnonce._id); 

    subCateg.save()
      .then(() => res.json('Sybcateg  updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));

  newAnnonce.save()
    .then(() => res.json('Annonce added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Find by Id
router.get('/:id', (req, res) => {
  Annonce.findById(req.params.id)
      .then(annonce => res.json(annonce))
      .catch(err => res.status(400).json('Error: ' + err));

});
//delete annonce

router.delete('/:id', (req, res) => {

//1- bch n7awmou l id mta3 sub categ eli msajlin fih l annonce
//2- ba3ad ma nalgouh nfass5ou l id mta3 l annonce ml list des annoces mta3 sub categ
//3- mba3ad nsajlou l subcateg 
//4- mba3ad nfas5ou l annonces

//1 =>bch n7awmou l id mta3 sub categ eli msajlin fih l annonce
  Annonce.findById(req.params.id)
      .then(annonce => 
         {
        //2=>ba3ad ma nalgouh nfass5ou l id mta3 l annonce ml list des annoces mta3 sub categ
         Subcateg.findById(annonce.subCategID)
         .then(subCateg => {
                             subCateg.annonces.splice(subCateg.annonces.indexOf(req.params.id,1));
                              //3=> mba3ad nsajlou l subcateg 
                              subCateg.save()
                              .then(() => res.json('Sybcateg  updated!'))
                              .catch(err => res.status(400).json('Error: ' + err));
                            }
               );
        }
          );
    
//4=>mba3ad nfas5ou l annonces
  Annonce.findByIdAndDelete(req.params.id)
      .then(() => res.json('Annonce deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));


});

//update annoce
router.post('/update/:id', (req, res) => {

  const { id } = req.params
  const { objet , detail } = req.body

  const updatedAnnonce = { objet , detail };

  Annonce.findByIdAndUpdate(id, { $set: updatedAnnonce }, { new: true })
      .then(updatedAnnonce => {
          res.status(200).json({ message: 'Annonce updated!', updatedAnnonce })
      })
      .catch(err => res.status(400).json({ Error: err }));


});

module.exports = router;