const mongoose=require('mongoose');
const Schema=mongoose.schema;
const personne=require('./personne.model');
const Admin= new Schema({
    grade:{type:String , required: true ,trim: true,
        minlength: 3,}
    });
    const admin =personne.discriminator('Admin',Admin);
    module.exports=admin;

