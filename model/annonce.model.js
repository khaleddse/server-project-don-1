const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Annonce = new Schema({
<<<<<<< HEAD
  objet: { type: String, trim: true, require: true },
  detail: { type: String, trim: true },
  adresse: { type: String, trim: true },
  user: { type: String },
  image: {
    data: Buffer,
    contentType: String,
  },
=======
  objet: { type: String,trim: true, require: true },
  detail: { type: String ,trim: true},
  adresse:{type:String ,trim: true},
  user:{ type: String},
  image: {
    data: Buffer,
    contentType: String
}
>>>>>>> 4ccd3d2e30383d413c645a072cab177cd64808d4
});

var annonce = mongoose.model("Annonces", Annonce);

module.exports = annonce;
