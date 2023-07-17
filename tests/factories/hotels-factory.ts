import { Hotel, Room } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel(): Promise<Hotel> {
  return await prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.internet.url(),
    } as Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>,
  });
}

export async function createRoom(hotelId: number): Promise<Room> {
  return await prisma.room.create({
    data: {
      name: faker.company.catchPhrase(),
      capacity: 4,
      hotelId,
    },
  });
}

export async function getHotelAndRooms(hotelId: number) {
  return await prisma.hotel.findFirst({ where: { id: hotelId }, include: { Rooms: true } });
}
