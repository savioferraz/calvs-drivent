import { AuthenticatedRequest } from "@/middlewares";
import lodgeService from "@/services/lodge-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const hotelId = Number(req.params.hotelId);

    if (hotelId) {
      const rooms = await lodgeService.listHotels(userId, hotelId);

      return res.status(httpStatus.OK).send(rooms);
    } else {
      const hotels = await lodgeService.listHotels(userId, hotelId);

      return res.status(httpStatus.OK).send(hotels);
    }
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.status === 403) return res.sendStatus(httpStatus.FORBIDDEN);
    if (error.status === 402) return res.sendStatus(httpStatus.PAYMENT_REQUIRED);

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
