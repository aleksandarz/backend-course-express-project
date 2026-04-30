import express from "express";
import {
  aliasTopTours,
  createNewTour,
  deleteTour,
  getAllTours,
  getMonthlyPlan,
  getSingleTour,
  getTourStats,
  updateTourWithPatch,
} from "../controllers/tourController.js";

const router = express.Router();

router.route("/top-5-cheap").get(aliasTopTours, getAllTours);

router.route("/tour-stats").get(getTourStats);

router.route("/monthly-plan/:year").get(getMonthlyPlan);

router.route("/").get(getAllTours).post(createNewTour);

router.route("/:id").get(getSingleTour).patch(updateTourWithPatch).delete(deleteTour);

export default router;
