const Admin = require("../model/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "don.project2020@gmail.com",
    pass: "Mern@123",
  },
});
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.addAdmin = async (req, res) => {
  const { nom, prenom, tel, email, password, grade } = req.body;
  const hashedpw = await bcrypt.hash(password, 12);
  try {
    if (hashedpw) {
      const newadmin = new Admin({
        nom,
        prenom,
        tel: Number(tel),
        email,
        password: hashedpw,
        grade,
      });

      const admin = await newadmin.save();
      if (!admin) {
        throw new Error("cannot add admin !");
      }
      res.status(200).json({ message: "Admin added", admin });
    }
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

exports.RechercheAdminbyId = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.delteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json("admin deleted.");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.UpDateAdmin = async (req, res) => {
  const { adminId } = req.userData;
  const { nom, prenom, tel, email } = req.body;
  const updatedAdmin = { nom, prenom, tel, email };
  try {
    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { $set: updatedAdmin },
      { new: true }
    );
    const { _id, email, nom, prenom, tel, grade } = admin;
    const payload = {
      adminId: _id,
      email,
      nom,
      prenom,
      tel,
      grade,
    };
    const token = await jwt.sign(payload, "don2020!", {
      expiresIn: 3600,
    });
    res.status(200).json({
      message: "Admin updated!",
      token: "Bearer " + token,
    });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

exports.RepondeAvis = async (req, res) => {
  const { email, message } = req.body;
  try {
    transporter.sendMail(
      {
        from: "youremail@gmail.com",
        to: email,
        subject: "Repondre avis ",
        text: message,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
    return res.status(200).json({ message: "email envoyée avec succes" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

//les taches
/*  1.refacto avec l'example
    2.Async Await => promises
    3.installation Prettier avec ESLINT
*/
