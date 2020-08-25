const mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

let bugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  date: { type: Date, default: Date.now() },
  comments: [commentSchema],
});

module.exports = mongoose.model("bugs", bugSchema);
