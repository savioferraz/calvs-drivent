import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function findTicketsType() {
  const result = ticketsRepository.findTicketsType();
  return result;
}

async function findUserTickets(userId: number) {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw notFoundError();

  const result = ticketsRepository.findTickets(enrollmentWithAddress.id);

  if (result === null) throw notFoundError();

  return result;
}

async function createNewTicket(userId: number, ticketTypeId: number) {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw notFoundError();

  await ticketsRepository.createNewTicket(enrollmentWithAddress.id, ticketTypeId);
}

const ticketsServices = { findTicketsType, findUserTickets, createNewTicket };

export default ticketsServices;
