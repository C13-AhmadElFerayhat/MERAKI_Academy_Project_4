const mongoose = require("mongoose");

const Dreams = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt:{ type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  tages: {type: String},
  mood: String,
  visibility: {Type: String}
});

module.exports = mongoose.model("Dreams", Dreams);
