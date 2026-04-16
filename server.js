import mongoose from "mongoose";
import "dotenv/config";
import app from "./app.js";

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

const conn = await mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

if (conn) {
  console.log("Connected successfully");
}

const tourSchema = new mongoose.Schema({
  name: { type: String, required: [true, "A tour name is required"], unique: true },
  rating: { type: Number, required: false, default: 4.5 },
  price: { type: Number, required: [true, "A tour price is required"] },
});

const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  name: "The Forest Hiker",
  rating: 4.7,
  price: 497,
});

const doc1 = await testTour.save();
console.log(doc1);

const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.HOSTNAME || "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`App running on http://${HOSTNAME}:${PORT}`);
});
