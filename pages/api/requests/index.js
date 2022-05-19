import dbConnect from "../../../lib/dbConnect";
import Request from "../../../models/request";
import logger from "../../../components/logger/createLogger";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (req.query.id) {
          logger.info("REQUEST GET Request by id = " + req.query.id);
          return res.status(200).json(await Request.findById(req.query.id));
        }else if (req.query.idUsuario) {
          logger.info("REQUEST GET Request by idUsuario = " + req.query.idUsuario);
          return res.status(200).json(await Request.find({"idUsuario":req.query.idUsuario}));
        }else {
          logger.info("REQUEST GET Request and find all");
          return res.status(200).json(await Request.find({}));
        }
      } catch (error) {
        logger.error("ERROR GET Request: " + error);
        return res.status(400).json({ success: false });
      }
    case "POST":
      try {
        if (req.body.name) {
          const request = new Request(req.body);
          logger.info("REQUEST POST Request by name = " + req.body.name);
          return res.status(200).json(await request.save());
        }
        logger.error("REQUEST POST Request name empty: ");
        return res.status(400).json({ success: false });
      } catch (error) {
        logger.error("ERROR POST Request: " + err);
        return res.status(500).json({ message: err.message });
      }
    case "PUT":
      try {
        if (req.body._id) {
          const request = new Request(req.body);
          logger.info("REQUEST PUT Request by id = " + req.body._id);
          await Request.findOneAndUpdate({ _id: req.body._id }, request);
          return res
            .status(200)
            .json(await Request.findOne({ _id: req.body._id }));
        }
        logger.error("REQUEST PUT Request id empty: ");
        return res.status(400).json({ success: false });
      } catch (error) {
        logger.error("ERROR PUT Request: " + err);
        return res.status(500).json({ message: err.message });
      }
    case "DELETE":
      try {
        logger.info("REQUEST DELETE Request by id = " + req.body._id);
        return res
          .status(200)
          .json(await Request.deleteOne({ _id: req.body._id }));
      } catch (error) {
        logger.error("ERROR DELETE Request: " + err);
        return res.status(400).json({ success: false });
      }
    default:
      break;
  }
}
