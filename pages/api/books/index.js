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
          logger.info("Request Get Book by id = " + req.query.id);
          return res.status(200).json(await Books.findById(req.query.id));
        }
        if (req.query.name) {
          logger.info("Request Get Book by name = " + req.query.name);
          return res.status(200).json(
            await Books.find({
              name: { $regex: req.query.name, $options: "i" },
            })
          );
        }
        if (req.query.ISBN) {
          logger.info("Request Get Book by ISBN = " + req.query.ISBN);
          return res
            .status(200)
            .json(await Books.find({ ISBN: { $regex: req.query.ISBN } }));
        }
        logger.info("Request Get Book and find all");
        return res.status(200).json(await Books.find({}));
      } catch (error) {
        logger.error("Error Get Book: " + error);
        return res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const book = new Books(req.body);
        logger.info("Request Post Book: " + book);
        const haveBook = await Books.find({ ISBN: { $regex: book.ISBN } });
        if (haveBook == "") {
          logger.info("Request Post, Create new Book: " + book);
          return res.status(200).json(await book.save());
        }
        logger.info("Request Post, Book already exists");
        return res
          .status(400)
          .json({ success: false, message: "ISBN already exists" });
      } catch (error) {
        logger.error("Error Post Book: " + error);
        return res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        await Books.findByIdAndUpdate(req.body._id, req.body);
        logger.info("Request Put Book: " + req.body);
        return res.status(200).json(await Books.findOne({ _id: req.body._id }));
      } catch (error) {
        logger.error("Error Put Book: " + error);
        return res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        logger.info("Request Delete Book: " + req.body);
        return res
          .status(200)
          .json(await Books.deleteOne({ _id: req.body._id }));
      } catch (error) {
        logger.error("Error Delete Book: " + error);
        return res.status(400).json({ success: false });
      }
    default:
      break;
  }
}
module.exports = handler;
