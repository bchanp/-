import { z } from "zod";

import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/async-handler.js";

const serviceSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  durationMinutes: z.number().int().positive(),
  price: z.number().nonnegative(),
  coverImage: z.string().optional()
});

const slotSchema = z.object({
  serviceId: z.number().int().positive(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  capacity: z.number().int().positive().default(1)
});

const appointmentStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "REJECTED", "COMPLETED"])
});

export const listAppointments = asyncHandler(async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    include: {
      user: true,
      service: true,
      timeSlot: true
    },
    orderBy: { createdAt: "desc" }
  });

  res.json({ appointments });
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const data = appointmentStatusSchema.parse(req.body);

  const appointment = await prisma.appointment.update({
    where: { id: Number(req.params.id) },
    data: { status: data.status }
  });

  res.json({ appointment });
});

export const createService = asyncHandler(async (req, res) => {
  const data = serviceSchema.parse(req.body);

  const service = await prisma.service.create({
    data
  });

  res.status(201).json({ service });
});

export const createSlot = asyncHandler(async (req, res) => {
  const data = slotSchema.parse(req.body);

  const slot = await prisma.timeSlot.create({
    data: {
      serviceId: data.serviceId,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      capacity: data.capacity
    }
  });

  res.status(201).json({ slot });
});

