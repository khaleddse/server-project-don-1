const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var Annonce = new Schema({
    objet :{type:String,require:true},
    detail:{type:String},
    // subCategID:[{type: mongoose.Schema.Types.ObjectId, ref: "SubCateg"}], 
    subCategID:{type:String,required:true}
});

var annonce = mongoose.model('Annonces', Annonce);

module.exports = annonce;