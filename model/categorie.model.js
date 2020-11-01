const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categ = new Schema({
       name:{type:String,required:true},
       subcategs :[{type: mongoose.Schema.Types.ObjectId, ref: "SubCateg"}],
});

const Categ = mongoose.model('Categ', categ);

module.exports = Categ;