import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function dateAt(dayOffset, hour, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date;
}

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "管理员",
      email: "admin@example.com",
      phone: "18800000000",
      passwordHash: adminPassword,
      role: "ADMIN"
    }
  });

  const haircut = await prisma.service.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "理发预约",
      description: "基础洗剪吹服务，适合日常造型整理。",
      durationMinutes: 45,
      price: 68
    }
  });

  const consultation = await prisma.service.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "咨询预约",
      description: "一对一咨询服务，可用于校园、职业或业务咨询。",
      durationMinutes: 60,
      price: 0
    }
  });

  const services = [haircut, consultation];

  for (const service of services) {
    const existingSlots = await prisma.timeSlot.count({
      where: { serviceId: service.id }
    });

    if (existingSlots === 0) {
      await prisma.timeSlot.createMany({
        data: [
          {
            serviceId: service.id,
            startTime: dateAt(1, 10),
            endTime: dateAt(1, 11),
            capacity: 3
          },
          {
            serviceId: service.id,
            startTime: dateAt(1, 14),
            endTime: dateAt(1, 15),
            capacity: 2
          },
          {
            serviceId: service.id,
            startTime: dateAt(2, 10),
            endTime: dateAt(2, 11),
            capacity: 3
          }
        ]
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed data created.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

