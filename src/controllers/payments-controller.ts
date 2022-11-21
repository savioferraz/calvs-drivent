import { requestError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import paymentsServices, { PaymentData } from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketId = req.query.ticketId as string;

  if (!ticketId) {
    throw requestError(400, "BAD_REQUEST");
  }

  try {
    const payments = await paymentsServices.findPayments(Number(ticketId), userId);

    return res.status(httpStatus.OK).send(payments);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "RequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const paymentData: PaymentData = req.body;

  try {
    const payment = await paymentsServices.createPayment(paymentData, userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "RequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
