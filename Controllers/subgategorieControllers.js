let SubCateg = require('../model/subcategorie.model');
let Categ = require('../model/categorie.model');

exports.getAllSubcategorie= async (req, res) => {
    try{
        const subCategories = await SubCateg.find().populate('annonces')
        res.status(200).json({subCategories})
    } catch(err){
        res.status(400).json({err});
    }
};

exports.addSubcategories= async (req, res) => {
    const { name } = req.body;
  
    const categID = req.params.id;
  
  
    const newSubCateg = new SubCateg({
      name,
      categID
    });
  try{
        const addedSubCategorie= await newSubCateg.save()
        const categgg=await Categ.findByIdAndUpdate(req.params.id, { $push: { subcategs: addedSubCategorie._id }})
        res.status(200).json({message: 'categorie updated!', addedSubCategorie});
   }catch (err){
          res.status(400).json({err});
        }
};
  
exports.delteSubcategories= async (req, res) => {
    try{
      await SubCateg.findByIdAndDelete(req.params.id)
      res.json('Subcateg deleted.');
    } catch(err){
       res.status(400).json('Error: ' + err);
      }
}; 

exports.RechercheSubParId= async(req, res) => {
  try{
   const subcateg=await SubCateg.findById(req.params.id)
    res.json(subcateg)
  } catch(err){
      res.status(400).json('Error: ' + err);
    }  
};

exports.UpDateSubcategorie= async (req, res) => {

    const { id } = req.params
    const { name } = req.body
  
    const updatedSubcateg = { name };
  try{
        await SubCateg.findByIdAndUpdate(id, { $set: updatedSubcateg }, { new: true })
        res.status(200).json({ message: 'Subcateg updated!', updatedSubcateg })
      } catch(err){
          res.status(400).json({ Error: err });
        } 
};