import fs from "fs";

const __dirname = import.meta.dirname;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

export const checkID = (req, res, next, value) => {
  const tourId = Number(value);

  if (!tourId || tourId > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

export const checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || name.trim() === "" || !price || price <= 0) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid name or price",
    });
  }

  next();
};

export const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

export const getSingleTour = (req, res) => {
  const tourId = Number(req.params.id);
  const filteredTour = tours.find((tour) => tour.id === tourId);

  res.status(200).json({
    status: "success",
    data: {
      tour: filteredTour,
    },
  });
};

export const createNewTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    "utf-8",
    (err) => {
      if (err) return console.log(err);
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

export const updateTourWithPatch = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated",
    },
  });
};

export const deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
