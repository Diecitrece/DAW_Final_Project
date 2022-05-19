import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

const users = mongoose.models.users || mongoose.model("users", userSchema);
export default users;
