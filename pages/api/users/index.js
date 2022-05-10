import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (req.query.id) {
          res.status(200).json(await Users.findById(req.query.id));
          return;
        }
        if (req.query.name) {
          res.status(200).json(
            await Users.find({
              name: { $regex: req.query.name, $options: "i" },
            })
          );
          return;
        }
        res.status(200).json(await Users.find({}));
        return;
      } catch (error) {
        res.status(400).json({ success: false });
        return;
      }
    default:
      break;
  }
}
