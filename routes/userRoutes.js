import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUserByID,
  updateUserWithPatch,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getSingleUserByID).patch(updateUserWithPatch).delete(deleteUser);

export default router;
