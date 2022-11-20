import { prisma } from "@/config";

async function findPaymentsByTicketId(ticketId: number) {
  return prisma.payment.findFirst({ where: { ticketId } });
}

const paymentsRepository = { findPaymentsByTicketId };

export default paymentsRepository;
