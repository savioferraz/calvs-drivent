import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findPaymentsByTicketId(ticketId: number) {
  return prisma.payment.findFirst({ where: { ticketId } });
}

async function createPayment(newPayment: Omit<Payment, "id">) {
  return prisma.payment.create({ data: newPayment });
}

const paymentsRepository = { findPaymentsByTicketId, createPayment };

export default paymentsRepository;
