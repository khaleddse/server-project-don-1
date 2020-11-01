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
 try{
    const addedAnnonce = await newAnnonce.save()
    const sub=await Subcateg.findByIdAndUpdate(req.params.id, { $push: { annonces: addedAnnonce._id }})
    console.log(sub)
    res.status(200).json({message: 'Sybcateg updated!', addedAnnonce})
  } catch (err){
      res.status(400).json({err});
    }

    
}
exports.delteAnnonce=async (req, res) => {
  try{
  await Annonce.findByIdAndDelete(req.params.id)
    res.status(200).json('Annonce deleted.');
  } catch (err){
      res.status(400).json(err);
    }
}
exports.RechercheParID=async (req, res) => {
  try{
    const annonce =  await Annonce.findById(req.params.id)
      res.status(200).json({annonce})
  } catch(err) {
    res.status(400).json(err);
  }  
};
exports.UpDatedAnnonce = async (req, res) => {

  const { id } = req.params
  const { objet , detail } = req.body
  const updatedAnnonce = { objet , detail };
try{
     await Annonce.findByIdAndUpdate(id, { $set: updatedAnnonce }, { new: true })   
    res.status(200).json({ message: 'Annonce updated!', updatedAnnonce })
  } catch(err){
      res.status(400).json({ err });
    } 
}

