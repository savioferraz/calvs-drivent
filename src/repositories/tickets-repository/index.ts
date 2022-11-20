import { prisma } from "@/config";
import { TicketType, Ticket } from "@prisma/client";

async function findTicketsType() {
  return prisma.ticketType.findMany();
}

async function findTicketsByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: { TicketType: true },
  });
}

async function createNewTicket(body: CreateTicketParams): Promise<Ticket> {
  return prisma.ticket.create({
    data: body,
    include: { TicketType: true },
  });
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
    include: { TicketType: true },
  });
}

async function updateTicketStatus(id: number) {
  return prisma.ticket.update({
    where: { id },
    data: { status: "PAID" },
  });
}

export type CreateTicketParams = Omit<Ticket, "id">;
export type CreateTicketTypeParams = Omit<TicketType, "id" | "createdAt" | "updatedAt">;

const ticketsRepository = {
  findTicketsType,
  findTicketsByEnrollmentId,
  createNewTicket,
  findTicketById,
  updateTicketStatus,
};

export default ticketsRepository;
