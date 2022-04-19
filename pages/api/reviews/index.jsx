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
                console.log(review._id);
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

        const reviewExist = await Books.find({
          "reviews.idReview": review.idReview,
        });

        if (review.idReview == "") {
          //create an objectid with mongoose
          const idUnique = mongoose.Types.ObjectId();
          review.idReview = idUnique;
        }

        if (reviewExist.length === 0) {
          const book = await Books.findOneAndUpdate(
            { idBook },
            { $push: { reviews: review } },
            { new: true }
          );

          const books = await Books.find({});

          res.status(200).json(books);
        } else {
          const book = await Books.findOneAndUpdate(
            { idBook },
            { $pull: { reviews: { idReview: review.idReview } } }
          );

          const updateBook = await Books.findOneAndUpdate(
            { idBook },
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

        const del = await Books.updateOne(
          { "reviews.idReview": idReview },
          { $pull: { reviews: { idReview: idReview } } }
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