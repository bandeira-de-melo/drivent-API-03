import { Hotel } from '@prisma/client';
import { prisma } from '../../config';

async function getHotels(): Promise<Hotel[]> {
  return await prisma.hotel.findMany();
}

async function getHotelWithRooms(hotelId: number) {
  return await prisma.hotel.findFirst({ where: { id: hotelId }, include: { Rooms: true } });
}

export const hotelsRepository = {
  getHotels,
  getHotelWithRooms,
};
