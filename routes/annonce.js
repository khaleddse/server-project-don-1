const router = require('express').Router();
let Annonce = require('../model/annonce.model');
let Subcateg = require('../model/subcategorie.model');

//read all
router.get('/',(req, res) => {
    Annonce.find()
    .then(annonces => res.json(annonces))
    .catch(err => res.status(400).json('Error: ' + err));
});

//create annonce
  router.post('/add/:id/:userid', (req, res) => {
  const { objet, detail } = req.body;

  subCategID=req.params.id;
  userID=req.params.userid;
  const newAnnonce = new Annonce({
    objet,
    detail,
    subCategID,
    userID
  });

  Subcateg.findById(req.params.id)
  .then(subCateg => {
    subCateg.annonces.push(newAnnonce); 
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
                             subCateg.annonces=subCateg.annonces.filter(el=>el._id!=req.params.id)
                             
                              //3=> mba3ad nsajlou l subcateg 
                              subCateg.save()
                              .then(() => res.json('Sybcateg  updated!'))
                              .catch(err => res.status(400).json('Error: ' + err));
                            }
               ).catch(err => res.status(400).json('Error: ' + err));;
        })
      .catch(err => res.status(400).json(' Error: ' + err));;
    
//4=>mba3ad nfas5ou l annonces
  Annonce.findByIdAndDelete(req.params.id)
      .then(() => res.json('Annonce deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));


});

//get by subcategCateg ID
router.get('/getAll/subcateg/:id', (req, res) => {
Annonce.find({ subCategID: req.params.id})
    .then(annonces => res.json(annonces))
    .catch(err => res.status(400).json('Error: ' + err));
});

//getall by user ID(retourner tous les annonce d'un utilisateurs specifique)
router.get('/getAll/user/:id', (req, res) => {
  Annonce.find({ userID: req.params.id})
      .then(annonces => res.json(annonces))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//update annoce
router.post('/update/:id', (req, res) => {

  const { id } = req.params
  const { objet , detail } = req.body

  const updatedAnnonce = { objet , detail };

  Annonce.findByIdAndUpdate(id, { $set: updatedAnnonce }, { new: true })
  .then(updatedAnnonce => {
            Subcateg.findById(updatedAnnonce.subCategID)
                    .then(subcateg => {
                      subcateg.annonces = subcateg.annonces.filter(el => el._id != req.params.id);
                      subcateg.annonces.push(updatedAnnonce);

                      subcateg.save()
                              .then(() => res.json('Annonce + Subcateg  updated!'))
                              .catch(err => res.status(400).json(' Subcateg update Error: ' + err));
                                       });

      res.status(200).json({ message: 'Annonce updated!', updatedAnnonce });
  })
  .catch(err => res.status(400).json(' Error: ' + err));
});

//search by annonce.objet text
router.post('/search/:text', (req, res) => {
  text=req.params.text.trim();
  //$option :"i" (insensitive to upper and lower case)
Annonce.find({ objet: { "$regex":text ,"$options": "i"} })
      .then(annonces => res.json(annonces))
      .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;