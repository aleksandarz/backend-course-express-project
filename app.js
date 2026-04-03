import express from "express";
import * as fs from "fs";

const app = express();
app.use(express.json());

const __dirname = import.meta.dirname;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours
    },
  });
}

const getSingleTour = (req, res) => {
  const tourId = Number(req.params.id);
  const filteredTour = tours.find(tour => tour.id === tourId);

  if (tourId > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: filteredTour
    },
  });
}

const createNewTour = (req, res) => {
  // console.log(req.body);

  let newId = tours[tours.length - 1].id + 1;
  let newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours, null, 2), "utf-8", (err) => {
    if (err) return console.log(err);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    });
  });
}

const updateTourWithPatch = (req, res) => {
  const tourId = Number(req.params.id);

  if (!tourId) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated",
    }
  });
}

const deleteTour = (req, res) => {
  const tourId = Number(req.params.id);

  if (!tourId) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(204).json({
    status: "success",
    data: null
  });
}

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getSingleTour);
// app.post("/api/v1/tours", createNewTour);
// app.patch("/api/v1/tours/:id", updateTourWithPatch);
// app.delete("/api/v1/tours/:id", deleteTour);

// Refactored routes
app.route("/api/v1/tours")
  .get(getAllTours)
  .post(createNewTour);

app.route("/api/v1/tours/:id")
  .get(getSingleTour)
  .patch(updateTourWithPatch)
  .delete(deleteTour);

const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.HOSTNAME || "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`App running on http://${HOSTNAME}:${PORT}`);
});