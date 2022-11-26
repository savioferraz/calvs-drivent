import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels } from "@/controllers/lodge-controller";

const lodgeRouter = Router();

lodgeRouter.all("/*", authenticateToken).get("", getHotels);

export { lodgeRouter };
