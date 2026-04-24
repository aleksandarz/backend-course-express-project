import mongoose from "mongoose";
import "dotenv/config";
import app from "./app.js";

const DB = process.env.DATABASE.replace("<DATABASE_PASSWORD>", process.env.DATABASE_PASSWORD);

const conn = await mongoose.connect(DB);

if (conn) {
  console.log("Connected successfully");
}

const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.HOSTNAME || "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`App running on http://${HOSTNAME}:${PORT}`);
});
