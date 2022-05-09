import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/user";
import logger from "../../../components/logger/createLogger";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        if (req.body.id) {
          logger.info("REQUEST POST User by id = " + req.body.id);
          let user = await Users.findOne({ _id: req.body.id });
          await Users.updateOne(
            { _id: req.body.id },
            { banned: user.banned ? false : true }
          );
          user.banned = user.banned ? false : true;
          await user.save();

          return res.status(200).json(user);
        }
      } catch (error) {
        logger.error("ERROR POST User: " + error);
        return res.status(400).json({ success: false });
      }
    default:
      break;
  }
}
