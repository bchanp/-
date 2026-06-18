import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/async-handler.js";

export const listServiceSlots = asyncHandler(async (req, res) => {
  const slots = await prisma.timeSlot.findMany({
    where: {
      serviceId: Number(req.params.serviceId),
      status: "AVAILABLE",
      startTime: {
        gte: new Date()
      }
    },
    orderBy: { startTime: "asc" }
  });

  res.json({ slots });
});

