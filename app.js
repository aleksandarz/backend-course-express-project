import express from "express";
import * as fs from "fs";

const app = express();
app.use(express.json());

const __dirname = import.meta.dirname;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  // console.log(req.body);

  let newId = tours[tours.length - 1].id + 1;
  let newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), "utf-8", (err) => {
    if (err) return console.log(err);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    });
  });
});

const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.HOSTNAME || "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`App running on http://${HOSTNAME}:${PORT}`);
});