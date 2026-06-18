import { Router } from "express";

import {
  createService,
  createSlot,
  listAppointments,
  updateAppointmentStatus
} from "../controllers/admin.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(requireAuth);
router.use(requireRole("ADMIN"));

router.get("/appointments", listAppointments);
router.put("/appointments/:id/status", updateAppointmentStatus);
router.post("/services", createService);
router.post("/slots", createSlot);

export default router;

