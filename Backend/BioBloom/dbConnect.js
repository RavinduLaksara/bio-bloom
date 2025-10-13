import mongoose from "mongoose";

export default function DbConnect() {
  mongoose
    .connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected...");
    })
    .catch((e) => {
      console.log(e);
    });
}
