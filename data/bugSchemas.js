const mongoose = require("mongoose");
const comment = require('./commentSchemas');

let commentSchema = comment.commentSchema;

let tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  colour: { type: String, required: true }
});

let bugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String },
  tags: [tagSchema],
  date: { type: Date, default: Date.now() },
  comments: [commentSchema],
  archived: {type: Boolean,  default: false }
});

let bugModel = mongoose.model("bugs", bugSchema);

module.exports = {
  bugSchema,
  bugModel
}


