import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const lodgeRouter = Router();

lodgeRouter.all("/*", authenticateToken).get("/");

export { lodgeRouter };
