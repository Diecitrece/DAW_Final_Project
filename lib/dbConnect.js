// /lib/dbConnect.js
import mongoose from "mongoose";

async function dbConnect() {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default dbConnect;
