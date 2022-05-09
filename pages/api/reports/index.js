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
        logger.info("Request Get Reviews idReview: ", idReview);
        const book = await Books.find({ idReview: idReview });
        let review = book[0].reviews.find((i) => {
          return i.idReview === idReview;
        });
        logger.info("Response Get Reviews: ", review);
        return res.status(200).json(review.reports);
      } catch (error) {
        logger.error("Error Get Reviews: ", error);
        return res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { idReview, report } = req.body;
        logger.info("Request Post Reviews idReview: ", idReview);
        const book = await Books.find({ idReview: idReview }).lean();
        let review = book[0].reviews.find((i) => {
          return i.idReview === idReview;
        });
        review.reports.push(report);
        await Books.findOneAndReplace({ _id: book[0]._id }, book[0]);
        logger.info("Response Post Reviews: ", review);
        return res.status(200).json(review.reports);
      } catch (error) {
        logger.error("Error Post Reviews: ", error);
        return res.status(400).json({ error });
      }
      break;
    case "DELETE":
      try {
        const { idReview } = req.body;
        logger.info("Request Delete Reviews idReview: ", idReview);
        const book = await Books.find({ idReview: idReview }).lean();
        let review = book[0].reviews.find((i) => {
          return i.idReview === idReview;
        });
        review.reports = [];
        await Books.findOneAndReplace({ _id: book[0]._id }, book[0]);
        logger.info("Response Delete Reviews: ", review);
        return res.status(200).json(review.reports);
      } catch (error) {
        logger.error("Error Delete Reviews: ", error);
        return res.status(400).json({ error });
      }
    default:
      break;
  }
}
