import { AuthenticatedRequest } from "@/middlewares";
import ticketsServices from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsType = await ticketsServices.findTicketsType();
    return res.status(httpStatus.OK).send(ticketsType);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const tickets = await ticketsServices.findUserTickets(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketTypeId = req.body.ticketTypeId as number;

  try {
    const ticket = await ticketsServices.createNewTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
