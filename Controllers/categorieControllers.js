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
        const Rst=await Categ.findByIdAndDelete(req.params.id)
          if(Rst)
              res.json('Categorie deleted ')
           else
               throw new Error("subCateg Undefined !")

               
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

exports.UpdateCategories = async (req, res) => {
    const { id } = req.params;
    const updateCateg =  req.body;

    try {
      /* Rst= */await Categ.findByIdAndUpdate(id, { $set: updateCateg }, { new: true })
       //if(Rst)  
           res.status(200).json({ message: 'Categorie updated !', updateCateg })
       /* else
            throw new Error("CategorieID undefined")*/
     } catch (err) {
        res.status(400).json({ Error: err.message })
    }



};