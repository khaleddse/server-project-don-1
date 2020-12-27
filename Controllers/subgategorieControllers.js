const SubCateg = require('../model/subcategorie.model');
const Categ = require('../model/categorie.model');
const annonce = require('../model/annonce.model');

exports.getAllSubcategorie = async (req, res) => {
  try {
    const subCategories = await SubCateg.find()//.populate('annonces');
    res.status(200).json({ subCategories });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.addSubcategories = async (req, res) => {
  const { nom } = req.body;
  const newSubCateg = new SubCateg({
    nom,
  });
  try {
    const Rst = await Categ.findById(req.params.id);
    if (Rst) {
      const addedSubCategorie = await newSubCateg.save();
      await Categ.findByIdAndUpdate(req.params.id, {
        $push: { subcategs: addedSubCategorie._id },
      });
      res.status(200).json({ message: 'categorie updated!', addedSubCategorie });
    } else {
      throw new Error('categ undefined !');
    }
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

exports.delteSubcategories = async (req, res) => {
  try {
    Rst = await SubCateg.findByIdAndDelete(req.params.id);

    if (Rst == null) {
      throw new Error('subCateg Undefined !');
    } else {
      res.status(200).json('Subcateg deleted.');
    }
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

exports.RechercheSubParId = async (req, res) => {
  try {
    const subcateg = await SubCateg.findById(req.params.id).populate('annonces');
    res.status(200).json(subcateg);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

exports.UpDateSubcategorie = async (req, res) => {
  const { id } = req.params;

  const updatedSubcateg = req.body;

  try {
    const Rst = await SubCateg.findByIdAndUpdate(
      id,
      { $set: updatedSubcateg },
      { new: true }
    );
    if (Rst == null) {
      throw new Error('subCateg Undefined !');
    } else {
      res.status(200).json({ message: 'Subcateg updated!', updatedSubcateg });
    }
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};
