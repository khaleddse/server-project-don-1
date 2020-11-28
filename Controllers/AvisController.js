const Avis = require('../model/avis.model');

exports.getAllAvis = async (req, res) => {
  try {
    const aviss = await Avis.find();
    res.json(aviss);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

exports.addAvis = async (req, res) => {
  const { email, detail } = req.body;

  const newavis = new Avis({ email, detail });
  try {
    await newavis.save();
    res.json('avis added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

/*exports.RechercheAvisParId = async (req, res) => {
    try {
        const Avis = await Avis.findById(req.params.id)
        res.json(Avis)
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};
*/

exports.deleteAvis = async (req, res) => {
  try {
    const Rst = await Avis.findByIdAndDelete(req.params.id);
    if (!Rst) {
      res.status(400).json('Error: ' + err);
    }
    res.status(200).json('Avis deleted ');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

//exports.Updateavis = async (req, res) => {
// const { id } = req.params;
// const updateAvis =  req.body;

// try {
// /* Rst= */await Categ.findByIdAndUpdate(id, { $set: updateAvis }, { new: true })
//if(Rst)
//   res.status(200).json({ message: 'Avis updated !', updateAvis })
/* else
     throw new Error("AvisID undefined")*/
//} catch (err) {
// res.status(400).json({ Error: err.message })
//}
