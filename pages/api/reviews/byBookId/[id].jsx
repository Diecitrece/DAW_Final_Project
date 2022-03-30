import dbConnect from "../../../../lib/dbConnect";
import Books from "../../../../models/book";

export default async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    try {
      const bookId = req.query.id;

      console.log(bookId);

      await dbConnect();

      try {
        const book = await Books.findById(bookId);

        res.status(200).json(book);
      } catch (error) {
        res.status(200).json([]);
      }
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
};
