const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const personne = require('./personne.model');
const user = new Schema({
    givenQuantity:{
      type:Number,
      default: 0
    },
    receivedQuantity:{
      type:Number,
      default: 0
    },
    annonces:[{type: mongoose.Schema.Types.ObjectId, ref: "Annonces"}],
});

const User = personne.discriminator('User',user);
module.exports=User;