const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SubCateg = new Schema({
       name:{type:String,required:true},
       annonces:[],
       categID:{type:String,required:false}
});

const subCateg = mongoose.model('SubCateg', SubCateg);

module.exports = subCateg;