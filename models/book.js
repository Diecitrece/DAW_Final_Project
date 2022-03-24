var mongoose = require("mongoose");

var bookSchema = mongoose.Schema({
  name: {
    type: "String",
  },
  ISBN: {
    type: "String",
  },
  reviews: {
    type: ["Mixed"],
  },
});

var books = db.model("books", bookSchema);

module.exports = books; // this is what you want
