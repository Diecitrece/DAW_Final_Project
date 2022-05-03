import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  name: {
    type: "String",
  },
  author: {
    type: "String",
  },
  description: {
    type: "String",
  },
  reviewd: {
    type: "Boolean",
  },
});

const requests =
  mongoose.models.requests || mongoose.model("requests", requestSchema);
export default requests;
