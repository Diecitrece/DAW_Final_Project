import dbConnect from "../../../lib/dbConnect";
import Books from "../../../models/book";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (req.query.id) {
          res.status(200).json(await Books.findById(req.query.id));
        }
        if (req.query.name) {
          res
            .status(200)
            .json(await Books.find({ name: { $regex: req.query.name } }));
        }
        res.status(200).json(await Books.find({}));
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const book = new Books(req.body);
        res.status(200).json(await book.save());
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const book = new Books(req.body);
        await Books.findOneAndUpdate({ _id: req.body._id }, book);
        res.status(200).json(await Books.findOne({ _id: req.body._id }));
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        res.status(200).json(await Books.deleteOne({ _id: req.body._id }));
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      break;
  }
}
