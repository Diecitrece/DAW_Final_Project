import logger from "../../../components/logger/createLogger";
import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (req.query.id) {
          logger.info("REQUEST GET User by id = " + req.query.id);
          return res.status(200).json(await Users.findById(req.query.id));
        }
        if (req.query.name) {
          logger.info("REQUEST GET User by name = " + req.query.name);
          return res.status(200).json(
            await Users.find({
              name: { $regex: req.query.name, $options: "i" },
            })
          );
        }
        logger.info("REQUEST GET User and find all");
        return res.status(200).json(await Users.find({}));
      } catch (error) {
        logger.error("ERROR GET User: " + error);
        return res.status(400).json({ success: false });
      }
    case "DELETE":
      try {
        logger.info("REQUEST DELETE Users: " + req.body);
        return res
          .status(200)
          .json(await Users.deleteOne({ _id: req.body._id }));
      } catch (error) {
        logger.error("ERROR DELETE Users: " + error);
        return res.status(400).json({ success: false });
      }
    default:
      break;
  }
}
