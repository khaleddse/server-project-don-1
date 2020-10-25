const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://mern:mern123@cluster0.hascb.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
const AdminRouter = require('./routes/admin');
const usersRouter = require('./routes/user');
const annoncessRouter = require('./routes/annonce');
const categsRouter = require('./routes/categorie');
const subCategRouter = require('./routes/subcategorie');

app.use('/admin', AdminRouter);
app.use('/user', usersRouter);
app.use('/annonce', annoncessRouter);
app.use('/categorie', categsRouter);
app.use('/subcategorie', subCategRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});