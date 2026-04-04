import fs from "fs";

const __dirname = import.meta.dirname;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

export const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours
    },
  });
}

export const getSingleTour = (req, res) => {
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

export const createNewTour = (req, res) => {
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

export const updateTourWithPatch = (req, res) => {
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

export const deleteTour = (req, res) => {
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