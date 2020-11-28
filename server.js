const express = require('express');
const mongoDbConnect = require('./utils/db.js');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const AdminRouter = require('./routes/admin');
const usersRouter = require('./routes/user');
const annoncessRouter = require('./routes/annonce');
const categsRouter = require('./routes/categorie');
const subCategRouter = require('./routes/subcategorie');
const AvisRouter = require('./routes/avis');

app.use('/admin', AdminRouter);
app.use('/user', usersRouter);
app.use('/annonce', annoncessRouter);
app.use('/categorie', categsRouter);
app.use('/subcategorie', subCategRouter);
app.use('/avis', AvisRouter);

const main = async () => {
  try {
    // learn Async Await => promises => callback
    // mongodb => promise  => mongoDbConnect => promise
    const connection = await mongoDbConnect();
    if (connection) {
      console.log('db connected');
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
