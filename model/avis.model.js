const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var avis = new Schema({
  email: { type: String, require: true },
  detail: { type: String },
});

var Avis = mongoose.model('avis', avis);

module.exports = Avis;
