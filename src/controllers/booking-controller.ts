import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import bookingService from "@/services/booking-service";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.listUserBooking(Number(userId));

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.statusText === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.statusText === "PaymentRequired") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const newBooking = await bookingService.createBooking(userId, roomId);

    return res.status(httpStatus.OK).send(newBooking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.statusText === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.statusText === "PaymentRequired") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;

  try {
    const updatedBooking = await bookingService.updateBooking(Number(userId), Number(roomId), Number(bookingId));

    return res.status(httpStatus.OK).send(updatedBooking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.statusText === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.statusText === "PaymentRequired") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
