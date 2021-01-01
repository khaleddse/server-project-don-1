const User = require("../model/user.model");
const { validationResult } = require("express-validator/check");
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

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { nom, prenom, tel, email, password } = req.body;
    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
      return res.status(404).json({ message: "email déja existe" });
    }
    const hashedpw = await bcrypt.hash(password, 12);
    if (hashedpw) {
      const user = new User({
        nom: nom,
        prenom: prenom,
        tel: tel,
        email: email,
        password: hashedpw,
      });
      const addedUser = await user.save();

      res.status(200).json({ message: "User created", userId: addedUser._id });
      transporter.sendMail(
        {
          from: "youremail@gmail.com",
          to: email,
          subject: "Sending Email using Node.js",
          text: "hello " + nom + " welcom to Najemn3awen",
        },
        function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
    } else {
      return res.status(400).json({ message: "mot de passe pas hashé" });
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "vous avez pas un compte!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { _id, email, nom, prenom, tel } = user;
      const payload = {
        userId: _id,
        email,
        nom,
        prenom,
        tel,
        grade: "user",
      };

      const token = await jwt.sign(payload, "don2020!", { expiresIn: 3600 });

      if (token) {
        res
          .status(200)
          .json({ success: true, token: "Bearer " + token, UserId: _id });
      }
    } else {
      return res.status(400).json({ message: "mot de passe incorrect" });
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const Users = await User.find().populate("annonces");
    res.status(200).json({ Users });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.FindUserById = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.deleteUser = async (req, res) => {
  console.log(req.userData);
  const { userId } = req.userData;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "user deleted." });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.UpDateUser = async (req, res) => {
  const { userId } = req.userData;
  const { nom, prenom, tel, email } = req.body;
  const updatedUser = { nom, prenom, tel, email, grade: "user" };
  const playload = { nom, prenom, tel, email, grade: "user", userId };
  try {

    const user=await User.findByIdAndUpdate(userId, { $set: updatedUser }, { new: true });
    const { _id, email, nom, prenom, tel } = user;
    const payload = {
      userId: _id,
      email,
      nom,
      prenom,
      tel,
      grade: "user",
    };
    const token = await jwt.sign(payload, "don2020!", {

      expiresIn: 3600,
    });
    res
      .status(200)
      .json({ message: "User updated!", token: "Bearer " + token, UserId: _id});
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};
