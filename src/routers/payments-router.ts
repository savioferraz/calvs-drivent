import { authenticateToken, validateBody } from "@/middlewares";
import { getPaymentByTicketId, postPayment } from "@/controllers";
import { Router } from "express";
import { paymentsSchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .post("/process", validateBody(paymentsSchema), postPayment);

export { paymentsRouter };
