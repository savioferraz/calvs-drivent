import { authenticateToken } from "@/middlewares";
import { getTickets, getTicketType, postTicket } from "@/controllers";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken).get("/", getTickets).post("/", postTicket).get("/types", getTicketType);

export { ticketsRouter };
