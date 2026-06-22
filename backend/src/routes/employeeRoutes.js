import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee
} from "../controllers/employeeController.js";

const router = express.Router();

router.route("/").get(getEmployees).post(createEmployee);
router.route("/:id").put(updateEmployee).delete(deleteEmployee);

export default router;

