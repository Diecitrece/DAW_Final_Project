import dbConnect from "../../../lib/dbConnect";
import Books from "../../../models/book";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const { body } = req;
      const { idBook, newReview } = body;

      //console.log(idBook);
      //console.log(review);

      await dbConnect();

      const book = await Books.findById(idBook);

      //book.reviews.push(newReview);

      let reviewExists = false;

      book.reviews.forEach((review) => {
        console.log(review);

        if (review.idReview == newReview.idReview) {
          console.log("already exists");
          reviewExists = true;
        }
      });

      if (reviewExists == false) {
          
        book.reviews.push( newReview );
        console.log("review has been added");
      } else {
        //if review already exists in reviews array, delete it and add the new one 
        book.reviews.forEach((review) => {
          console.log(review);

          if (review.idReview == newReview.idReview) {
            book.reviews.splice(book.reviews.indexOf(review), 1);
            book.reviews.push( newReview );
          }
        });
        
      }
      await book.save();

      res.status(200).json(book);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
