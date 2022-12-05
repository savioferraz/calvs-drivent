import { notFoundError, requestError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function verifyTicketAndEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw requestError(403, "ForbiddenError");

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.TicketType.includesHotel === false) throw requestError(403, "ForbiddenError");
  if (ticket.status !== "PAID") throw requestError(402, "PaymentRequired");
}

async function verifyRoomCapacity(roomId: number) {
  const room = await hotelRepository.findRoomById(roomId);
  if (!room) throw notFoundError();
  if (room.Booking.length >= room.capacity) throw requestError(403, "ForbiddenError");
}

async function listUserBooking(userId: number) {
  await verifyTicketAndEnrollment(userId);

  const booking = await bookingRepository.findBookingByUserId(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function createBooking(userId: number, roomId: number) {
  await verifyTicketAndEnrollment(userId);
  if (roomId < 1) throw notFoundError();

  await verifyRoomCapacity(roomId);

  const newBooking = await bookingRepository.createBooking(userId, roomId);

  return newBooking;
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  await verifyTicketAndEnrollment(userId);
  if (roomId < 1 || bookingId < 1) throw notFoundError();

  await verifyRoomCapacity(roomId);

  const updatedBooking = await bookingRepository.updateBooking(roomId, bookingId);

  return updatedBooking;
}

const bookingService = {
  listUserBooking,
  createBooking,
  updateBooking,
};

export default bookingService;
