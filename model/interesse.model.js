const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var interesse = new Schema({
    email:{type:String,require:true},
    detail:{type:String},

});

var Interesse = mongoose.model('interesse', interesse);

module.exports = Interesse;