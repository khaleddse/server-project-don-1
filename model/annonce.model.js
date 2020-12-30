const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Annonce = new Schema({
  objet: { type: String,trim: true, require: true },
  detail: { type: String ,trim: true},
  adresse:{type:String ,trim: true},
  user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  telephone:{ type: String},
  image:{ type: String},
},
{
  timestamps: true,
});

var annonce = mongoose.model("Annonces", Annonce);

module.exports = annonce;
