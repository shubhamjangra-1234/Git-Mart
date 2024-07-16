const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/AdminPanel");

const userSchema = mongoose.Schema({
  fullName:String,
  username:String,
  email:String,
  password:String,
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);