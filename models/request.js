import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  idUsuario: {
    type: "String",
  },
  name: {
    type: "String",
  },
  author: {
    type: "String",
  },
  description: {
    type: "String",
  },
});
const requests =
  mongoose.models.requests || mongoose.model("requests", requestSchema);
export default requests;
