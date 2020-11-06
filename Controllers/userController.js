const router = require('express').Router();
const User = require('../model/user.model');


exports.getAllUsers=async (req,res)=>{
    try{
        const Users = await User.find().populate('user')
        res.status(200).json({Users})
    } catch(err){
        res.status(400).json({err});
    }
};
//c'est bon testé
exports.addUser= async (req, res) => {

  const { nom, prenom, tel, email } = req.body;

  const newUser = new User({
      nom,
      prenom,
      tel,
      email,
  });

 try{
  const addedUser = await newUser.save()
  res.status(200).json({addedUser, message: 'user Added'});
} catch (err){
  res.status(400).json({ err });
}
};

// ! Refactoring
exports.FindUserById= async (req, res) => {
    try{
         const admin=await User.findById(req.params.id)
         res.json(admin)
        
    }catch(err){
        res.status(400).json('Error: ' + err);
      }  
};

// ! Refactoring
exports.deleteUser= async(req, res) => {
        try{
          await User.findByIdAndDelete(req.params.id)
           res.json('user deleted.')
        } catch(err){
            res.status(400).json('Error: ' + err);
          } 
};

// ! Refactoring
exports.UpDateUser= async (req, res) => {

    const { id } = req.params
    const { nom, prenom, tel, email } = req.body

    const updatedUser = { nom, prenom, tel, email };
    try{
        const user=  await  User.findByIdAndUpdate(id, { $set: updatedUser }, { new: true })
        if(user)
        res.status(200).json({ message: 'User updated!', user })
        else
              throw new Error("User Undefined !")
    } catch(err){
                res.status(400).json({ Error: err.message });
    } 
};

