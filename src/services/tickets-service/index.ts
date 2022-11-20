import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository, { CreateTicketParams } from "@/repositories/tickets-repository";

async function findTicketsType() {
  const result = await ticketsRepository.findTicketsType();
  return result;
}

async function findUserTickets(userId: number) {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  const result = await ticketsRepository.findTicketsByEnrollmentId(enrollmentWithAddress.id);

  if (!result || !enrollmentWithAddress) throw notFoundError();

  return result;
}

async function createNewTicket(userId: number, ticketTypeId: number) {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw notFoundError();
  const body: CreateTicketParams = {
    ticketTypeId,
    enrollmentId: enrollmentWithAddress.id,
    status: "RESERVED",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await ticketsRepository.createNewTicket(body);
  return result;
}

const ticketsServices = { findTicketsType, findUserTickets, createNewTicket };

export default ticketsServices;
