const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const personne = require('./personne.model');
const user = new Schema({
  password: {
    type: String,
    required: true,
  },
  QuantiteDonnee: {
    type: Number,
    default: 0,
  },
  QuantiteReceived: {
    type: Number,
    default: 0,
  },
  annonces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Annonces' }],
});

const User = personne.discriminator('User', user);
module.exports = User;
