const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Admin = require("../model/admin.model");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        return res.status(401).json({ message: "vous avez pas un compte!" });
      } else {
        const verifepass = await bcrypt.compare(password, admin.password);
        if (verifepass) {
          const { _id, email, nom, prenom, tel, grade } = admin;
          const payload_ad = {
            adminId: _id,
            email,
            nom,
            prenom,
            tel,
            grade,
          };
          const tokenAdmin = await jwt.sign(payload_ad, "don2020!", {
            expiresIn: 3600,
          });
          if (tokenAdmin) {
            res
              .status(200)
              .json({ success: true, token: "Bearer " + tokenAdmin });
          }
        } else {
          return res.status(400).json({ message: "mot de passe incorrect" });
        }
      }
    } else {
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
    }
  } catch (err) {
    return res.status(400).json({ Error: err.message });
  }
};
