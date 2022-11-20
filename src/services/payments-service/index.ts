import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function findPayments(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (enrollment.id !== ticket.enrollmentId) throw unauthorizedError();

  const payment = await paymentsRepository.findPaymentsByTicketId(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}

const paymentsServices = { findPayments };

export default paymentsServices;
