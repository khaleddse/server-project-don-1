const Annonce = require('../model/annonce.model');
const Subcateg = require('../model/subcategorie.model');
const User = require('../model/user.model');

exports.getAllAnnonces = async (req, res) => {
  const annonces = await Annonce.find()
  res.status(200).json(annonces)
}

exports.addAnnonce= async (req, res) => {
  const { objet, detail } = req.body;

  const newAnnonce = new Annonce({
    objet,
    detail,
    
  });
 try{
  const Rst= await Subcateg.findById(req.params.id)
  const userRst=await User.findById(req.params.UserID)
  if(Rst!= null && userRst !=null){
    const addedAnnonce = await newAnnonce.save()
    await Subcateg.findByIdAndUpdate(req.params.id, { $push: { annonces: addedAnnonce._id }})
    await User.findByIdAndUpdate(req.params.UserID, { $push: { annonces: addedAnnonce._id }})

    res.status(200).json({message: 'Annonce Added ! Subcateg & User updated !', addedAnnonce})
  }else{ throw new Error("SubcategID or UserID undefined !") }
      
  } catch (err){
      res.status(400).json({ Error : err.message });
    }

    
}
exports.delteAnnonce=async (req, res) => {
  try{
  rst =await Annonce.findByIdAndDelete(req.params.id)
  if(rst) 
      res.status(200).json('Annonce deleted.');
  else
    throw new Error("Annonce Undefined !")

  } catch (err){
      res.status(400).json({ Error : err.message });
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
  const updatedAnnonce =    req.body

try{
     /*const Rst=*/await Annonce.findByIdAndUpdate(id, { $set: updatedAnnonce }, { new: true })   
    //  if(Rst)
                await res.status(200).json({ message: 'Annonce updated!', updatedAnnonce })
    // else
     //    throw new Error("annonceID undefined !")

    } catch(err){
      res.status(400).json({ Error : err.message });
    } 
}

exports.SearchAnnonceByText = async (req, res) => {
  text=req.params.text.trim();
  const annonces = await Annonce.find({ objet: { "$regex":text ,"$options": "i"} })
  res.status(200).json(annonces)
}

