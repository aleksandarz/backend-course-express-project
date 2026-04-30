import express from "express";
import {
  aliasTopTours,
  createNewTour,
  deleteTour,
  getAllTours,
  getSingleTour,
  getTourStats,
  updateTourWithPatch,
} from "../controllers/tourController.js";

const router = express.Router();

router.route("/top-5-cheap").get(aliasTopTours, getAllTours);

router.route("/tour-stats").get(getTourStats);

router.route("/").get(getAllTours).post(createNewTour);

router.route("/:id").get(getSingleTour).patch(updateTourWithPatch).delete(deleteTour);

export default router;
