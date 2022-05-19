import logger from "../../../components/logger/createLogger";
import dbConnect from "../../../lib/dbConnect";
import Books from "../../../models/book";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (req.query.id) {
          logger.info("REQUEST GET Book by id = " + req.query.id);
          return res.status(200).json(await Books.findById(req.query.id));
        }
        if (req.query.name) {
          logger.info("REQUEST GET Book by name = " + req.query.name);
          return res.status(200).json(
            await Books.find({
              name: { $regex: req.query.name, $options: "i" },
            })
          );
        }
        if (req.query.ISBN) {
          logger.info("REQUEST GET Book by ISBN = " + req.query.ISBN);
          return res
            .status(200)
            .json(await Books.find({ ISBN: { $regex: req.query.ISBN } }));
        }
        logger.info("REQUEST GET Book and find all");
        return res.status(200).json(await Books.find({}));
      } catch (error) {
        logger.error("ERROR GET Book: " + error);
        return res.status(400).json({ success: false });
      }
    case "POST":
      try {
        const book = new Books(req.body);
        logger.info("REQUEST POST Book: " + book);
        const haveBook = await Books.find({ ISBN: { $regex: book.ISBN } });
        if (haveBook == "") {
          logger.info("REQUEST POST, Create new Book: " + book);
          return res.status(200).json(await book.save());
        }
        logger.info("REQUEST POST, Book already exists");
        return res
          .status(400)
          .json({ success: false, message: "ISBN already exists" });
        return;
      } catch (error) {
        logger.error("ERROR POST Book: " + error);
        return res.status(400).json({ success: false });
      }
    case "PUT":
      try {
        await Books.findByIdAndUpdate(req.body._id, req.body);
        logger.info("REQUEST PUT Book by id = " + req.body._id);
        return res.status(200).json(await Books.findOne({ _id: req.body._id }));
      } catch (error) {
        logger.error("ERROR PUT Book: " + error);
        return res.status(400).json({ success: false });
      }
    case "DELETE":
      try {
        logger.info("REQUEST DELETE Book: " + req.body);
        return res
          .status(200)
          .json(await Books.deleteOne({ _id: req.body._id }));
      } catch (error) {
        logger.error("ERROR DELETE Book: " + error);
        return res.status(400).json({ success: false });
      }
    default:
      break;
  }
}
module.exports = handler;
