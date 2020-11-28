const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const personneSchema= new Schema({
     nom:{
      type:String,
      required: true,
      trim: true,
      minlength: 3
    },
    prenom:{ 
      type:String,
      required: true,
      trim: true,
      minlength: 3
    },
    tel:{
      type:String,
      required:true,
      minlength:8
    },
    email: {
      type: String,
      required:true
    },
},{
    timestamps:true,
});
const Personne = mongoose.model('Personne',personneSchema);
module.exports=Personne;