import dbConnect from "../../../lib/dbConnect";
import Books from "../../../models/book";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { idReview, idUser } = req.query;

        if (idReview) {
          const review = await Books.find(
            { "reviews.idReview": idReview },
            { reviews: { $elemMatch: { idReview: idReview } } }
          );

          res.status(200).json(review[0]);
        } else if (idUser) {
          let revUser = [];

          const reviews = await Books.find(
            { "reviews.idUser": idUser },
            { reviews: 1 }
          );

          reviews.forEach((review) => {
            review.reviews.forEach((rev) => {
              if (rev.idUser === idUser) {
                rev.idBook = review._id;
                revUser.push(rev);
              }
            });
          });

          res.status(200).json(revUser);
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { body } = req;
        const { idBook, review } = body;

        if (review.idReview === "") {
          //add new review

          //create an objectid with mongoose

          const idUnique = mongoose.Types.ObjectId();
          review.idReview = idUnique;

          const book = await Books.findOneAndUpdate(
            { _id: idBook },
            { $push: { reviews: review } },
            { new: true }
          );

          const books = await Books.find({});

          res.status(200).json(books);
        } else {
          //update review

          var OidReview = mongoose.Types.ObjectId(review.idReview);
          review.idReview = OidReview;

          const book = await Books.findOneAndUpdate(
            { "reviews.idReview": OidReview },
            { $pull: { reviews: { idReview: OidReview } } }
          );

          const updateBook = await Books.findOneAndUpdate(
            { _id: idBook },
            { $push: { reviews: review } },
            { new: true }
          );

          const books = await Books.find({});

          res.status(200).json(books);
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const { body } = req;
        const { idReview } = body;

        const OidReview = mongoose.Types.ObjectId(idReview);

        const del = await Books.findOneAndUpdate(
          { "reviews.idReview": OidReview },
          { $pull: { reviews: { idReview: OidReview } } }
        );

        const books = await Books.find({});

        res.status(200).json(books);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      break;
  }
}
