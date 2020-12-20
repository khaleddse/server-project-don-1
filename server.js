const router = require('express').Router();
const annonceController = require('./Controllers/annonceControllers');
var multer = require('multer');
const express = require('express');
const mongoDbConnect = require('./utils/db.js');
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
// Set EJS as templating engine 
app.set("view engine", "ejs");

 

 
const AdminRouter = require('./routes/admin');
const usersRouter = require('./routes/user');
const annoncessRouter = require('./routes/annonce');
const categsRouter = require('./routes/categorie');
const subCategRouter = require('./routes/subcategorie');
const AvisRouter = require('./routes/avis');


//Block responsable a l'insertion d'une image a une annonce
//debut block
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  }
});

const upload = multer({ storage: storage});
const addAnnonceCtrl=router.post('/:id/:UserID', upload.single('image'), annonceController.addAnnonce);
//Fin block

app.use('/admin', AdminRouter);
app.use('/user', usersRouter);
app.use('/annonce/add',addAnnonceCtrl);
app.use('/annonce',annoncessRouter);
app.use('/categorie', categsRouter);
app.use('/subcategorie', subCategRouter);
app.use('/avis', AvisRouter);

const main = async () => {
  try {
    // learn Async Await => promises => callback
    // mongodb => promise  => mongoDbConnect => promise
    const connection = await mongoDbConnect();
    if (connection) {
      console.log('db connecté');
      app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
      });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

main();