import { z } from "zod";

import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/async-handler.js";

const createAppointmentSchema = z.object({
  serviceId: z.number().int().positive(),
  timeSlotId: z.number().int().positive(),
  contactName: z.string().min(2),
  contactPhone: z.string().min(6),
  note: z.string().optional()
});

export const createAppointment = asyncHandler(async (req, res) => {
  const data = createAppointmentSchema.parse(req.body);

  const appointment = await prisma.$transaction(async (tx) => {
    const slot = await tx.timeSlot.findUnique({
      where: { id: data.timeSlotId }
    });

    if (!slot || slot.serviceId !== data.serviceId || slot.status !== "AVAILABLE") {
      const error = new Error("Selected time slot is unavailable");
      error.status = 400;
      throw error;
    }

    if (slot.bookedCount >= slot.capacity) {
      const error = new Error("Selected time slot is fully booked");
      error.status = 400;
      throw error;
    }

    const created = await tx.appointment.create({
      data: {
        userId: req.user.id,
        serviceId: data.serviceId,
        timeSlotId: data.timeSlotId,
        contactName: data.contactName,
        contactPhone: data.contactPhone,
        note: data.note
      }
    });

    await tx.timeSlot.update({
      where: { id: data.timeSlotId },
      data: {
        bookedCount: {
          increment: 1
        }
      }
    });

    return created;
  });

  res.status(201).json({ appointment });
});

export const listMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    where: { userId: req.user.id },
    include: {
      service: true,
      timeSlot: true
    },
    orderBy: { createdAt: "desc" }
  });

  res.json({ appointments });
});

export const cancelAppointment = asyncHandler(async (req, res) => {
  const appointmentId = Number(req.params.id);

  const appointment = await prisma.$transaction(async (tx) => {
    const existing = await tx.appointment.findFirst({
      where: {
        id: appointmentId,
        userId: req.user.id
      }
    });

    if (!existing) {
      const error = new Error("Appointment not found");
      error.status = 404;
      throw error;
    }

    if (["CANCELLED", "REJECTED", "COMPLETED"].includes(existing.status)) {
      const error = new Error("Appointment cannot be cancelled");
      error.status = 400;
      throw error;
    }

    const updated = await tx.appointment.update({
      where: { id: appointmentId },
      data: { status: "CANCELLED" }
    });

    await tx.timeSlot.update({
      where: { id: existing.timeSlotId },
      data: {
        bookedCount: {
          decrement: 1
        }
      }
    });

    return updated;
  });

  res.json({ appointment });
});

