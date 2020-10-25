const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categ = new Schema({
       name:{type:String,required:true},
       subcategs:[],
});

const Categ = mongoose.model('Categ', categ);

module.exports = Categ;