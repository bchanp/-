import { Router } from "express";

import { listServiceSlots } from "../controllers/slot.controller.js";

const router = Router();

router.get("/service/:serviceId", listServiceSlots);

export default router;

