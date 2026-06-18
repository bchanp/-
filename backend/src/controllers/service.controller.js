import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/async-handler.js";

export const listServices = asyncHandler(async (req, res) => {
  const services = await prisma.service.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" }
  });

  res.json({ services });
});

export const getService = asyncHandler(async (req, res) => {
  const service = await prisma.service.findFirst({
    where: {
      id: Number(req.params.id),
      status: "ACTIVE"
    }
  });

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  res.json({ service });
});

