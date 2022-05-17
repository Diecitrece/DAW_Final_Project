import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: "String",
  },
  ISBN: {
    type: "String",
  },
  author: {
    type: "String",
  },
  description: {
    type: "String",
  },
  reviews: {
    type: ["Mixed"],
  },
});

const books = mongoose.models.books || mongoose.model("books", bookSchema);
export default books;
