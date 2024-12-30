const mongoose = require("mongoose");

const Dreams = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt:{ type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  tags: {type: Array},
  mood: String,
  visibility: {type: String, enum: ['private', 'public'], default: 'public'},
  img: String,
  isLucid: {type:Boolean, default: true}
});

module.exports = mongoose.model("Dreams", Dreams);
