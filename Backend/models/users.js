const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: String,
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt:{ type: Date, default: Date.now },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  isActive: {type:Boolean, default: true},
  img: String,
  Fav: [{type: mongoose.Schema.Types.ObjectId, ref: "Dreams"}],
  Followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  Following: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 7);
});
module.exports = mongoose.model("User", userSchema);
