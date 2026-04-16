import express from "express";
import {
  checkBody,
  createNewTour,
  deleteTour,
  getAllTours,
  getSingleTour,
  updateTourWithPatch,
} from "../controllers/tourController.js";

const router = express.Router();

router.route("/").get(getAllTours).post(checkBody, createNewTour);

router.route("/:id").get(getSingleTour).patch(updateTourWithPatch).delete(deleteTour);

export default router;
