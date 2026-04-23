import fs from "fs";
import mongoose from "mongoose";
import "dotenv/config";
import Tour from "../../models/tourModel.js";

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

const __dirname = import.meta.dirname;

const conn = await mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

if (conn) {
  console.log("Connected successfully");
}

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Tours created");
  } catch (err) {
    console.error(err);
  }
  process.exit();
}

const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log("Tours deleted");
  } catch (err) {
    console.error(err);
  }
  process.exit();
}

if (process.argv[2] === "--import") {
  await importData();
} else if (process.argv[2] === "--delete") {
  await deleteData();
}