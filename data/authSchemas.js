const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required:true}
  });

   let userModel = mongoose.model('users', userSchema);

module.exports = {
  userSchema,
  userModel
}