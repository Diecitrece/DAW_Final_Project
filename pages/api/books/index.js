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
          return;
        }
        if (req.query.name) {
          res.status(200).json(
            await Books.find({
              name: { $regex: req.query.name, $options: "i" },
            })
          );
          return;
        }
        if (req.query.ISBN) {
          res
            .status(200)
            .json(await Books.find({ ISBN: { $regex: req.query.ISBN } }));
          return;
        }
        res.status(200).json(await Books.find({}));
        return;
      } catch (error) {
        res.status(400).json({ success: false });
        return;
      }
    case "POST":
      try {
        const book = new Books(req.body);
        const haveBook = await Books.find({ ISBN: { $regex: book.ISBN } });
        if (haveBook == "") {
          res.status(200).json(await book.save());
          return;
        }
        res
          .status(400)
          .json({ success: false, message: "ISBN already exists" });
        return;
      } catch (error) {
        res.status(400).json({ success: false });
        return;
      } w
    case "PUT":
      try {
        await Books.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json(await Books.findOne({ _id: req.body._id }));
        return;
      } catch (error) {
        res.status(400).json({ success: false });
        return;
      }
    case "DELETE":
      try {
        res.status(200).json(await Books.deleteOne({ _id: req.body._id }));
        return;
      } catch (error) {
        res.status(400).json({ success: false });
        return;
      }
    default:
      break;
  }
}
module.exports = handler;
