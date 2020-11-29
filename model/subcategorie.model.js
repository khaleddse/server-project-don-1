const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcateg = new Schema({
  nom: { type: String, required: true },
  annonces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Annonces' }],
});

const SubCateg = mongoose.model('SubCateg', subcateg);

module.exports = SubCateg;
