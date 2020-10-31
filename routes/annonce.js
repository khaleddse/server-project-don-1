const router = require('express').Router();
let Annonce = require('../model/annonce.model');
let Subcateg = require('../model/subcategorie.model');
const annonceController = require('../Controllers/annonceControllers')


router.get('/', annonceController.getAllAnnonces);
router.post('/add/:id', annonceController.addAnnonce);


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
                             subCateg.annonces=subCateg.annonces.filter(el=>el._id!=req.params.id)
                             
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