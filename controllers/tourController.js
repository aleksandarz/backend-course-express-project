import Tour from "../models/tourModel.js";

export const getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query }
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(" ");
      console.log(fields);
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) {
        throw new Error("This page doesn't exist!");
      }
    }

    const tours = await query;

    res.status(200).json({
      status: "success",
      results: tours.countDocuments,
      data: {
        tours: tours,
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
}

export const getSingleTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

export const createNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

export const updateTourWithPatch = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {

  }
}

export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "No tour found with that ID",
      });
    }

    res.status(204).send();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}