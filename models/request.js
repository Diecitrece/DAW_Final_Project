var mongoose = require("mongoose");

var requestSchema = mongoose.Schema({
  name: {
    type: "String",
  },
  author: {
    type: "String",
  },
  reviewd: {
    type: "Boolean",
  },
});

var requests = db.model("requests", requestSchema);

module.exports = requests; // this is what you want
