const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subcateg = new Schema({
       name:{type:String,required:true},
       annonces:[{type: mongoose.Schema.Types.ObjectId, ref: "Annonces"}],
       categID:{type:String,required:false}
});

const SubCateg = mongoose.model('SubCateg', subcateg);

module.exports = SubCateg;