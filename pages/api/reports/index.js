import mongoose from "mongoose";
import dbConnect from "../../../lib/dbConnect";
import Books from "../../../models/book";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { idReview } = req.body;
        const book = await Books.find({ idReview: idReview });
        let review = book[0].reviews.find((i) => {
          return i.idReview === idReview;
        });
        res.status(200).json(review.reports);
        return;
      } catch (error) {
        res.status(400).json({ success: false });
        return;
      }
      break;
    case "POST":
      try {
        const { idReview, report } = req.body;
        const book = await Books.find({ idReview: idReview }).lean();
        let review = book[0].reviews.find((i) => {
          return i.idReview === idReview;
        });
        review.reports.push(report);
        await Books.findOneAndReplace({ _id: book[0]._id }, book[0]);
        res.status(200).json(review.reports);
        return;
      } catch (error) {
        res.status(400).json({ error });
        return;
      }
      break;
    case "DELETE":
      try {
        const { idReview } = req.body;
        const book = await Books.find({ idReview: idReview }).lean();
        let review = book[0].reviews.find((i) => {
          return i.idReview === idReview;
        });
        review.reports = [];
        await Books.findOneAndReplace({ _id: book[0]._id }, book[0]);
        res.status(200).json(review.reports);
        return;
      } catch (error) {
        res.status(400).json({ error });
        return;
      }
    default:
      break;
  }
}
