const User = require('../model/user.model');
const {validationResult}= require('express-validator/check');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


exports.signup=(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    const error=new Error('Validation failed.');
    error.statusCode=422;
    error.data=errors.array();
    throw error;
  }
  const { nom, prenom, tel, email,password } = req.body;
  /*const email=req.body.email;
  const name=req.body.name;
  const password=req.body.password;*/
bcrypt.hash(password,12).then(hashedpw=>{
  const user=new User({
nom:nom,
prenom:prenom,   
tel:tel, 
email:email,
password:hashedpw
  });
  return user.save();
})
.then(Result=>{
  res.status(200).json({message:'User created',userId:Result._id})
})
.catch(err=>{
  if(!err.statusCode){
    err.statusCode=500;
  }
  next(err);
});
}
exports.login=(req,res,next)=>{
  const {email,password}=req.body;
  let loadedUser;
  User.findOne({email:email})
  .then(user=>{
    if(!user){
      const error=new Error('A user with this email could not be found.');
      error.statusCode=401;
      throw error;
    }
    loadedUser=user;
    return bcrypt.compare(password,user.password);

  })
  .then(isEqual=>{
    if(!isEqual){
      const error=new Error('Wrong password');
      error.statusCode=401;
      throw error;
    }
    const  token=jwt.sign({
    email:loadedUser.email,
    userId:loadedUser._id.toString()
  },'somesupersecret',{expiresIn:'1h'}
  );
  res.status(200).json({ token:token, userId:loadedUser._id.toString() 
  });

  }).catch(err=>{
    if(!err.statusCode){
      err.statusCode=500;
    }
    next(err);
  })
}
exports.getAllUsers=async (req,res)=>{
    try{
        const Users = await User.find().populate('annonces')
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
   

    const updatedUser = req.body
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

