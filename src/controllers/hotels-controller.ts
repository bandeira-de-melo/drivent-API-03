import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares';
import { hotelsService } from '../services/hotels-service';

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const hotels = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'PaymentRequiredError') res.status(httpStatus.PAYMENT_REQUIRED).send(error.message);
    if (error.name === 'NotFoundError') res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getRoomsByHotelId(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const hotelId = Number(req.params.hotelId);
  if (!hotelId) return res.status(httpStatus.BAD_REQUEST).send({ message: 'HotelId Must Be Sent As Parameter' });
  try {
    const rooms = await hotelsService.getHotelsWithRooms(userId, hotelId);
    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    if (error.name === 'PaymentRequiredError') res.status(httpStatus.PAYMENT_REQUIRED).send(error.message);
    if (error.name === 'NotFoundError') res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
