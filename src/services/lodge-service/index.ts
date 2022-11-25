import { notFoundError } from "@/errors";
import lodgeRepository from "@/repositories/lodge-repository";

async function listHotels() {
  const hotels = await lodgeRepository.findHotels();

  if (!hotels) throw notFoundError;

  return hotels;
}

async function listRooms(hotelId: number) {
  const rooms = await lodgeRepository.findHotelRooms(hotelId);

  if (!rooms || !hotelId) throw notFoundError;

  return rooms;
}

const lodgeService = { listHotels, listRooms };

export default lodgeService;
