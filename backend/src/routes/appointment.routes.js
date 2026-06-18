import { Router } from "express";

import {
  cancelAppointment,
  createAppointment,
  listMyAppointments
} from "../controllers/appointment.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(requireAuth);
router.post("/", createAppointment);
router.get("/me", listMyAppointments);
router.put("/:id/cancel", cancelAppointment);

export default router;

