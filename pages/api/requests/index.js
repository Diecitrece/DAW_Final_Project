import dbConnect from "../../../lib/dbConnect";
import Request from "../../../models/request";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      if (req.query.id) {
        res.status(200).json(await Request.findById(req.query.id));
        return;
      } else {
        res.status(200).json(await Request.find({}));
        return;
      }
    case "POST":
      try {
        if (req.body.name) {
          const request = new Request(req.body);
          res.status(200).json(await request.save());
          return;
        }
        res.status(400).json({ success: false });
        return;
      } catch (err) {
        res.status(500).json({ message: err.message });
        return;
      }
    case "PUT":
      try {
        if (req.body._id) {
          const request = new Request(req.body);
          await Request.findOneAndUpdate({ _id: req.body._id }, request);
          res.status(200).json(await Request.findOne({ _id: req.body._id }));
          return;
        }
        res.status(400).json({ success: false });
        return;
      } catch (err) {
        res.status(500).json({ message: err.message });
        return;
      }
    case "DELETE":
      try {
        res.status(200).json(await Request.deleteOne({ _id: req.body._id }));
        return;
      } catch (error) {
        res.status(400).json({ success: false });
        return;
      }
    default:
      break;
  }
}
