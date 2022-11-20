import { requestError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import paymentsServices from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string;
  const { userId } = req;

  if (!ticketId) {
    throw requestError(400, "BAD_REQUEST");
  }

  try {
    const payments = await paymentsServices.findPayments(Number(ticketId), userId);

    return res.status(httpStatus.OK).send(payments);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }
    if (error.name === "RequestError") {
      return res.send(httpStatus.BAD_REQUEST);
    }
    if (error.name === "UnauthorizedError") {
      return res.send(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  try {
    return;
  } catch (error) {
    return;
  }
}
