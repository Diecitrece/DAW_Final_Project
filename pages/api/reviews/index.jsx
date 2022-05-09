import dbConnect from "../../../lib/dbConnect";
import Books from "../../../models/book";
import mongoose from "mongoose";
import logger from "../../../components/logger/createLogger";

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
          logger.info("REQUEST GET reviews: " + review);
          return res.status(200).json(review[0]);
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
          logger.info("REQUEST GET reviews: " + reviews);
          return res.status(200).json(revUser);
        }
      } catch (error) {
        logger.error("ERROR GET reviews: " + error);
        return res.status(400).json({ success: false });
      }
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
          await Books.findOneAndUpdate(
            { idBook },
            { $push: { reviews: review } },
            { new: true }
          );
          const books = await Books.find({});
          logger.info("REQUEST POST reviews: " + books);
          return res.status(200).json(books);
        } else {
          await Books.findOneAndUpdate(
            { idBook },
            { $pull: { reviews: { idReview: review.idReview } } }
          );
          await Books.findOneAndUpdate(
            { idBook },
            { $push: { reviews: review } },
            { new: true }
          );
          const books = await Books.find({});
          logger.info("REQUEST POST reviews: " + books);
          return res.status(200).json(books);
        }
      } catch (error) {
        logger.error("ERROR POST reviews: " + error);
        return res.status(400).json({ success: false });
      }
    case "DELETE":
      try {
        const { body } = req;
        const { idReview } = body;
        await Books.updateOne(
          { "reviews.idReview": idReview },
          { $pull: { reviews: { idReview: idReview } } }
        );
        const books = await Books.find({});
        logger.info("REQUEST DELETE reviews: " + books);
        return res.status(200).json(books);
      } catch (error) {
        logger.error("ERROR DELETE reviews: " + error);
        return res.status(400).json({ success: false });
      }
    default:
      break;
  }
}
