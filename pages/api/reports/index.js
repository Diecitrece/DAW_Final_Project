import mongoose from "mongoose";
import logger from "../../../components/logger/createLogger";
import dbConnect from "../../../lib/dbConnect";
import Books from "../../../models/book";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { idReview } = req.body;
        if (!idReview) {
          let reports = [];
          const books = await Books.find();
          books.map((book) => {
            book.reviews.map((review) => {
              review.reports.map((report) => {
                reports.push({ bookName: book.name, report });
              });
            });
          });
          return res.status(200).json(reports);
        }
        logger.info("REQUEST GET Reviews idReview: ", idReview);
        const OidReview = mongoose.Types.ObjectId(idReview);
        const book = await Books.find({ "reviews.idReview": OidReview });
        let review = book[0].reviews.find((i) => {
          return i.idReview.toString() === idReview;
        });
        if (!review) return res.status(404).send("Review not found");
        logger.info("REQUEST GET Reviews: ", review);
        return res.status(200).json(review.reports);
      } catch (error) {
        logger.error("ERROR GET Reviews: ", error);
        return res.status(400).json({ success: false });
      }
    case "POST":
      try {
        const { idReview, report } = req.body;
        logger.info("REQUEST POST Reviews idReview: ", idReview);
        const OidReview = mongoose.Types.ObjectId(idReview);
        const book = await Books.find({ "reviews.idReview": OidReview }).lean();
        let review = book[0].reviews.find((i) => {
          return i.idReview.toString() === idReview;
        });
        if (!review) return res.status(404).send("Review not found");
        review.reports.push(report);
        await Books.findOneAndReplace({ _id: book[0]._id }, book[0]);
        logger.info("REQUEST POST Reviews: ", review);
        return res.status(200).json(review);
      } catch (error) {
        logger.error("ERROR POST Reviews: ", error);
        return res.status(400).json({ error });
      }
    case "DELETE":
      try {
        const { idReview } = req.body;
        logger.info("REQUEST DELETE Reviews idReview: ", idReview);
        const OidReview = mongoose.Types.ObjectId(idReview);
        const book = await Books.find({ "reviews.idReview": OidReview }).lean();
        let review = book[0].reviews.find((i) => {
          return i.idReview.toString() === idReview;
        });
        if (!review) return res.status(404).send("Review not found");
        review.reports = [];
        await Books.findOneAndReplace({ _id: book[0]._id }, book[0]);
        logger.info("REQUEST DELETE Reviews: ", review);
        return res.status(200).json(review.reports);
      } catch (error) {
        logger.error("ERROR DELETE Reviews: ", error);
        return res.status(400).json({ error });
      }
    default:
      break;
  }
}
