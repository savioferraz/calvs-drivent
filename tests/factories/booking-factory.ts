import { prisma } from "@/config";

export async function createBookingbyUser(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}
