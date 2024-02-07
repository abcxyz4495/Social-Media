const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is  required"],
    unique: true,
  },
});

module.exports = mongoose.model("User", schema);
