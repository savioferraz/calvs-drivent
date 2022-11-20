import { prisma } from "@/config";
import { TicketType, Ticket } from "@prisma/client";

async function findTicketsType() {
  return prisma.ticketType.findMany();
}

async function findTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({ where: { enrollmentId }, include: { TicketType: true } });
}

async function createNewTicket(enrollmentId: number, ticketTypeId: number) {
  //   return prisma.ticket.create({ data: { enrollmentId: enrollmentId, ticketTypeId: ticketTypeId } });
  return;
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;
// export type CreateTicketTypeParams = Omit<TicketType, "id" | "createdAt" | "updatedAt">;

const ticketsRepository = { findTicketsType, findTickets, createNewTicket };

export default ticketsRepository;
