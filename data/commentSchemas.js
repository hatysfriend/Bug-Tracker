const mongoose = require('mongoose');
const authSchema = require('./authSchemas');
const Schema = mongoose.Schema;

let commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'users'},
    likes: [{
      user: { type: Schema.Types.ObjectId } 
    }],
    date: { type: Date, default: Date.now() },
  });

let model = mongoose.model('comments', commentSchema);
  
module.exports = {
    commentSchema,
    model
}
  
      