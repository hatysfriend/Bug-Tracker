const mongoose = require('mongoose');
const authSchema = require('./authSchemas')

let commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    user: { type: authSchema.userSchema, required: true },
    date: { type: Date, default: Date.now() },
  });

let model = mongoose.model('comments', commentSchema);
  
module.exports = {
    commentSchema,
    model
}
  
      