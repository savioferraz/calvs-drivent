import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    return;
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  try {
    return;
  } catch (error) {
    return;
  }
}

export async function getTicketType(req: AuthenticatedRequest, res: Response) {
  try {
    return;
  } catch (error) {
    return;
  }
}
