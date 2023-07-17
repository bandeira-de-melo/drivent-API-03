import { notFoundError } from '../../errors';
import { paymentRequiredError } from '../../errors/payment-required-error';
import { hotelsRepository } from '../../repositories/hotel-repository';
import { getTicketByEnrollmentId } from '../../utils/service-functions';
import enrollmentsService from '../enrollments-service';

async function getHotels(userId: number) {
  const isUserEnrolled = await enrollmentsService.getOneWithAddressByUserId(userId);
  if (!isUserEnrolled) throw notFoundError();
  const ticket = await getTicketByEnrollmentId(isUserEnrolled.id);

  if (!ticket) throw notFoundError();
  if (ticket.status !== 'PAID') throw paymentRequiredError('Missing Payment');
  if (ticket.TicketType.isRemote === true) throw paymentRequiredError('Ticket type is remote');
  if (ticket.TicketType.includesHotel === false) throw paymentRequiredError('Ticket Does Not Includes Hotel');

  const hotels = await hotelsRepository.getHotels();
  if (Object.keys(hotels).length === 0) throw notFoundError();
  return hotels;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  const isUserEnrolled = await enrollmentsService.getOneWithAddressByUserId(userId);
  if (!isUserEnrolled) throw notFoundError();

  const ticket = await getTicketByEnrollmentId(isUserEnrolled.id);
  if (!ticket) throw notFoundError();
  if (ticket.status !== 'PAID') throw paymentRequiredError('Missing Payment');
  if (ticket.TicketType.isRemote === true) throw paymentRequiredError('Ticket type is remote');
  if (ticket.TicketType.includesHotel === false) throw paymentRequiredError('Ticket Does Not Includes Hotel');

  const hotelWithRooms = await hotelsRepository.getHotelWithRooms(hotelId);
  if (!hotelWithRooms) throw notFoundError();
  return hotelWithRooms;
}

export const hotelsService = {
  getHotels,
  getHotelsWithRooms,
};
