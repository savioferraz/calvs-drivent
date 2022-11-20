import { authenticateToken, validateBody } from "@/middlewares";
import { getTickets, getTicketsType, postTicket } from "@/controllers";
import { Router } from "express";
import { createTicketSchema } from "@/schemas/tickets-schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .post("/", validateBody(createTicketSchema), postTicket)
  .get("/types", getTicketsType);

export { ticketsRouter };
