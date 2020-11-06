const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var Annonce = new Schema({
    objet :{type:String,require:true},
    detail:{type:String},
    annonces:[{type: mongoose.Schema.Types.ObjectId, ref: "Annonces"}],

});

var annonce = mongoose.model('Annonces', Annonce);

module.exports = annonce;