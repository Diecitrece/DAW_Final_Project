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
          const OidReview = mongoose.Types.ObjectId(idReview);
          const review = await Books.find(
            { "reviews.idReview": OidReview },
            { reviews: { $elemMatch: { idReview: OidReview } } }
          );
          logger.info("REQUEST GET reviews: " + review);
          return res.status(200).json(review[0]);
        } else if (idUser) {
          let revUser = [];
          const reviews = await Books.find(
            { "reviews.idUser": idUser },
            
          );
          
          reviews.forEach((review) => {
            review.reviews.forEach((rev) => {
              if (rev.idUser === idUser) {
                rev.idBook = review._id;
                rev.bookName = review.name;
                revUser.push(rev);
              }
            });
          });
          //sort revUser by pubDate
          revUser.sort((a, b) => {
            return new Date(b.pubDate) - new Date(a.pubDate);
          });
          logger.info("REQUEST GET reviews: " + reviews);
          //return res.status(200).json(revUser);1
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

          logger.info("REQUEST POST reviews: " + books);
          return res.status(200).json(books);
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

        const OidReview = mongoose.Types.ObjectId(idReview);

        const del = await Books.findOneAndUpdate(
          { "reviews.idReview": OidReview },
          { $pull: { reviews: { idReview: OidReview } } }
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
