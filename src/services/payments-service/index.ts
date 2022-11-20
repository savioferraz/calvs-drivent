import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Payment } from "@prisma/client";

async function findPayments(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (enrollment.id !== ticket.enrollmentId) throw unauthorizedError();

  const payment = await paymentsRepository.findPaymentsByTicketId(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}

async function createPayment(body: PaymentData, userId: number) {
  const ticket = await ticketsRepository.findTicketById(body.ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (enrollment.id !== ticket.enrollmentId) throw unauthorizedError();

  const newPayment: Omit<Payment, "id"> = {
    ticketId: body.ticketId,
    value: ticket.TicketType.price,
    cardIssuer: body.cardData.issuer,
    cardLastDigits: body.cardData.number.toString().slice(-4),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const payment = await paymentsRepository.createPayment(newPayment);
  await ticketsRepository.updateTicketStatus(body.ticketId);
  return payment;
}

export type PaymentData = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

const paymentsServices = { findPayments, createPayment };

export default paymentsServices;
