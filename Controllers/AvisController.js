const Avis = require('../model/avis.model');
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'don.project2020@gmail.com',
    pass: 'Mern@123',
  },
});
exports.getAllAvis = async (req, res) => {
  try {
    const aviss = await Avis.find();
    res.status(200).json(aviss);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

exports.addAvis = async (req, res) => {
  const { email, detail } = req.body;

  const newavis = new Avis({ email, detail });
  try {
    await newavis.save();
    transporter.sendMail(
      {
        from: 'don.project2020@gmail.com',
        to: email,
        subject: 'Merci de NajemN3awen',
        text: "Bonjour Monsieur/Madame  \n\n  Merci a vous pour nous donner un peu de votre temp, votre message a été bien reçue."+
        "\n Un de nos agents vous contactera le plus tôt possible pour plus de détails."+
        " \n\n Bonne journée  \n Equipe NajemN3awen \n\n NajemN3awen.com ",
        attachments: [{
          filename: 'logo.png',
          path: './logo.PNG',
          cid: 'Logo' 
     }]
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }
    );
    res.status(200).json('avis added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};



exports.deleteAvis = async (req, res) => {
  const { id } = req.params;
  try {
    const Rst = await Avis.findByIdAndDelete(id);
    if (!Rst) {
      res.status(400).json('Error: ' + err);
    }
    res.status(200).json('Avis deleted ');
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
