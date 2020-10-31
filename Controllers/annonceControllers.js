const Annonce = require('../model/annonce.model');
const Subcateg = require('../model/subcategorie.model');

exports.getAllAnnonces = async (req, res) => {
  const annonces = await Annonce.find()
  res.status(200).json(annonces)
}
exports.addAnnonce= async (req, res) => {
  const { objet, detail } = req.body;

  subCategID=req.params.id;

  const newAnnonce = new Annonce({
    objet,
    detail,
    subCategID
  });
  const addedAnnonce = await newAnnonce.save()
  await Subcateg.findByIdAndUpdate(req.params.id, { $push: { annonces: addedAnnonce._id }})
  res.status(200).json({message: 'Sybcateg updated!', addedAnnonce})
}