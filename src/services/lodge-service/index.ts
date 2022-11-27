import { notFoundError, requestError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import lodgeRepository from "@/repositories/lodge-repository";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function listHotels(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw requestError(403, "ForbiddenError");

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.TicketType.includesHotel === false) throw requestError(403, "ForbiddenError");
  if (ticket.status !== "PAID") throw requestError(402, "PaymentRequired");

  // const payment = await paymentRepository.findPaymentByTicketId(ticket.id);
  // if (!payment) throw requestError(403, "ForbiddenError");

  if (hotelId) {
    const hotelRooms = await lodgeRepository.findHotelWithRooms(hotelId);
    if (!hotelRooms) throw notFoundError();

    return hotelRooms;
  } else {
    const hotels = await lodgeRepository.findHotels();
    if (!hotels) throw notFoundError();

    return hotels;
  }
}

// async function listRooms(userId: number, hotelId: number) {
//   const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
//   if (!enrollment) throw notFoundError();

//   const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
//   if (!ticket || ticket.TicketType.includesHotel === false || ticket.status !== "PAID") throw notFoundError();

//   const payment = await paymentRepository.findPaymentByTicketId(ticket.id);
//   if (!payment) throw notFoundError();

//   const hotelRooms = await lodgeRepository.findHotelWithRooms(hotelId);
//   if (!hotelRooms) throw notFoundError();

//   return hotelRooms;
// }

const lodgeService = { listHotels };

export default lodgeService;
