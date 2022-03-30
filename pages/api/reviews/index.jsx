import dbConnect from "../../../lib/dbConnect";
import Books from "../../../models/book";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  try {
    const books = await Books.find({});

    let reviews = [];


    books.forEach(book => {
        book.reviews.forEach(review => {
            console.log(review);

            reviews.push(review);

        })
    });

    res.status(200).json( reviews );
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
