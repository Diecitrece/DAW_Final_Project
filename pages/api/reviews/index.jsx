import dbConnect from "../../../lib/dbConnect";
import Books from "../../../models/book";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { idReview, idUser } = req.query;

        if (idReview) {
          console.log("obtener una");

          const review = await Books.find(
            { "reviews.idReview": idReview },
            { reviews: { $elemMatch: { idReview: idReview } } }
          );

          res.status(200).json(review[0]);
        } else if (idUser) {
          console.log("obtener todas");

          const reviews = await Books.find(
            { "reviews.idUser": idUser },
            { reviews: { $elemMatch: { idUser: idUser } } }
          );

          res.status(200).json(reviews);
        } else {
          console.log("obtener todas");
          const books = await Books.find({});

          const reviews = await Books.find({}, { reviews: 1 });

          res.status(200).json(reviews);
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
            console.log("le aigno la id");
          const idUnique = uuidv4();
          console.log(idUnique);
          review.idReview = idUnique;
        }else{
            console.log("no le aigno la id");
        }

        //console.log(review.idReview);

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
