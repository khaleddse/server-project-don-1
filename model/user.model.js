const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const personne=require('./personne.model');
const user=new Schema({
    qte_donée:{type:Number,required:true},
    qte_recué:{type:Number,required:true},

});

const User=personne.discriminator('User',user);
module.exports=User;