import dbConnect from "../../../../lib/dbConnect";
import Books from "../../../../models/book";

export default async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    try {
      const userId = req.query.id;

      console.log(userId);

      await dbConnect();

      let reviewsArray = [];

      const books = await Books.find({});

      books.forEach((book) => {
        book.reviews.forEach((review) => {
          
          console.log("id user: " + review.idUser);
          console.log("---------------------------");
          console.log(review);
          console.log("######################");


          if (review.idUser == userId) {
            reviewsArray.push(review);
          }
        });
      });

      res.status(200).json(reviewsArray);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
};
