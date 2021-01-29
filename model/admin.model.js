const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const personne = require("./personne.model");

const Admin = new Schema({
  password: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
});

const admin = personne.discriminator("Admin", Admin);

module.exports = admin;
