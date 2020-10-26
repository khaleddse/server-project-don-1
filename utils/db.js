const mongoose = require('mongoose');

const mongoDbConnect = async () => {
  const uri = "mongodb+srv://mern:mern123@cluster0.hascb.mongodb.net/donation-dev?retryWrites=true&w=majority";
  mongoose.set('useFindAndModify', false);
  try {
    return await mongoose.connect(uri, 
        { useNewUrlParser: true, 
          useCreateIndex: true, 
          useUnifiedTopology: true
        })
  } catch(err) {
    console.error(err)
    throw err
  }
}

module.exports = mongoDbConnect