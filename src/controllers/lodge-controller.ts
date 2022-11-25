import { AuthenticatedRequest } from "@/middlewares";
import lodgeService from "@/services/lodge-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const hotels = await lodgeService.listHotels();

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  try {
    const hotelId = Number(req.query.hotelId);

    const rooms = await lodgeService.listRooms(hotelId);

    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
