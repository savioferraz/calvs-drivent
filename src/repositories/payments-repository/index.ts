import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findPaymentById(ticketId: number) {
  return prisma.payment.findUnique({ where: { id: ticketId } });
}

const paymentsRepository = { findPaymentById };

export default paymentsRepository;
