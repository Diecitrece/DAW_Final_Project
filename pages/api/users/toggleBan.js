import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/user";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                if (req.body.id) {
                    let user = await Users.findOne({ _id: req.body.id });
                    await Users.updateOne(
                        { _id: req.body.id },
                        { banned: user.banned ? false : true }
                    );
                    user.banned = user.banned ? false : true;
                    await user.save();

                    res.status(200).json(user);
                }
            } catch (error) {
                res.status(400).json({ success: false });
            }
        default:
            break;
    }
}
