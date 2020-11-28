const router = require('express').Router();
const Admin = require('../model/admin.model');

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

exports.addAdmin = async (req, res) => {
  const { nom, prenom, tel, email, grade } = req.body;

  const newadmin = new Admin({
    nom,
    prenom,
    tel: Number(tel),
    email,
    grade,
  });
  try {
    const admin = await newadmin.save();
    res.json({ message: 'Admin added', admin });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

exports.RechercheAdminbyId = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.json(admin);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

exports.delteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json('admin deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

exports.UpDateAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedAdmin = req.body;

    const admin = await Admin.findByIdAndUpdate(
      id,
      { $set: updatedAdmin },
      { new: true }
    );

    res.status(200).json({ message: 'admin updated!', admin });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

//les taches
/*  1.refacto avec l'example
    2.Async Await => promises
    3.installation Prettier avec ESLINT
*/
