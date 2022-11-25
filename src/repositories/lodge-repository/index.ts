import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findHotelRooms(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId: hotelId,
    },
  });
}

const lodgeRepository = { findHotels, findHotelRooms };

export default lodgeRepository;
