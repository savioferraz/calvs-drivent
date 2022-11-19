import { authenticateToken } from "@/middlewares";
import { getPaymentByTicketId, postPayment } from "@/controllers";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.all("/*", authenticateToken).get("/", getPaymentByTicketId).post("/process", postPayment);

export { paymentsRouter };
