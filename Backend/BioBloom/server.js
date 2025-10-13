import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import DbConnect from "./dbConnect.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT;

// Connect Database
DbConnect();

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
