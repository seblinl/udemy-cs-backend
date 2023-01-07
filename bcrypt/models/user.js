const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username can't be blank."],
  },
  password: {
    type: String,
    required: [true, "Password can't be blank."],
  },
});

userSchema.statics.findAndAuthenicate = async function (username, password) {
  const user = await this.findOne({ username });
  const isAuthenticated = await bcrypt.compare(password, user.password);
  return isAuthenticated ? user : false;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
