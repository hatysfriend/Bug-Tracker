const mongoose = require("mongoose");

const schema = (function () {
  let commentSchema = new mongoose.Schema({
    id: Number,
    name: String,
    title: String,
    body: String,
    date: { type: Date, default: Date.now() },
  });

  return {
    bugSchema() {
      return (bugSchema = new mongoose.Schema({
        name: String,
        author: String,
        status: String,
        description: String,
        tags: [String],
        date: { type: Date, default: Date.now() },
        comments: [commentSchema],
      }));
    },
  };
})();

module.exports = schema;
