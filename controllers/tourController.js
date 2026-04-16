import Tour from "../models/tourModel.js";

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
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

export const getSingleTour = (req, res) => {
  const tourId = Number(req.params.id);
  // const filteredTour = tours.find((tour) => tour.id === tourId);
  //
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tour: filteredTour,
  //   },
  // });
};

export const createNewTour = (req, res) => {
  // console.log(req.body);

  // res.status(201).json({
  //   status: "success",
  //   data: {
  //     tour: newTour,
  //   },
  // });
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
