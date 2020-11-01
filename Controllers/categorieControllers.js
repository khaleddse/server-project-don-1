const Categ = require('../model/categorie.model');

exports.getAllcategories = async (req, res) => {
    try {
        const categs=await Categ.find().populate('subcategs')
        res.json(categs)
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

exports.addCategorie = async (req, res) => {
    const name = req.body.name;

    const newcateg = new Categ({ name });
    try {
        await newcateg.save()
        res.json('Categorie added!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

exports.RechercheCatParId = async (req, res) => {
    try {
        const Categories = await Categ.findById(req.params.id)
        res.json(Categories)
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

exports.deleteCategories = async (req, res) => {
    try {
        await Categ.findByIdAndDelete(req.params.id)
        res.json('Categorie deleted ')
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

exports.UpdateCategories = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updateCateg = { name };
    try {
        await Categ.findByIdAndUpdate(id, { $set: updateCateg }, { new: true })
        res.status(200).json({ message: 'Categorie updated !', updateCateg })
    } catch (err) {
        res.status(400).json({ Error: err })
    }



};