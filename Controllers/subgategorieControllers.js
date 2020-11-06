let SubCateg = require('../model/subcategorie.model');
let Categ = require('../model/categorie.model');
const annonce = require('../model/annonce.model');

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
    const newSubCateg = new SubCateg({
      name,
    });
  try{
        const Rst= await Categ.findById(req.params.id)
        if(Rst){
          //suppossant ID mta3 categ ghalet , l creation mta3 l subcateg tssir
          //so lazmna nodhmnou enou fama categ bel ID eli 3adynah fl url
              const addedSubCategorie= await newSubCateg.save()
              await Categ.findByIdAndUpdate(req.params.id, { $push: { subcategs: addedSubCategorie._id }})
              res.status(200).json({message: 'categorie updated!', addedSubCategorie});

        }else{
          throw new Error("categ undefined !")
        }
   }catch (err){
          res.status(400).json({ Error: err.message });
        }
};
  
exports.delteSubcategories= async (req, res) => {
    try{
     //7atyt findByIdAndDelete f Rst bch najam na3mal catch kanha raj3et null
    //5ater findByIdAndDelete ki matlgach l Id traja3 null mch error
      Rst=await SubCateg.findByIdAndDelete(req.params.id)

      if(Rst==null){
        throw new Error("subCateg Undefined !")
       }else{
        res.json('Subcateg deleted.');
            }
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
  
    const updatedSubcateg = req.body

  try{
    //7atyt findByIdAndUpdate f Rst bch najam na3mal catch kanha raj3et null
    //5ater findByIdAndUpdate ki matlgach l Id traja3 null mch error
       Rst= await SubCateg.findByIdAndUpdate(id, { $set: updatedSubcateg }, { new: true })
       if(Rst==null){
        throw new Error("subCateg Undefined !")
       }else{
        res.status(200).json({ message: 'Subcateg updated!', updatedSubcateg })
            }
      } catch(err){
          res.status(400).json({ Error: err.message });
        } 
};