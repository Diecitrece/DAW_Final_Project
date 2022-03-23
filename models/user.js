var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  name: {
    type: "String",
  },
  email: {
    type: "String",
  },
  image: {
    type: "String",
  },
  role: {
    type: "String",
  },
  banned: {
    type: "Boolean",
  },
  emailVerified: {
    type: "Mixed",
  },
});

var users = db.model("users", userSchema);

module.exports = users; // this is what you want
