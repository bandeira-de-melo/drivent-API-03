import { Room } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotels() {
  return await prisma.hotel.createMany({
    data: [
      {
        name: faker.company.companyName(),
        image: faker.internet.url(),
      },
      {
        name: faker.company.companyName(),
        image: faker.internet.url(),
      },
    ],
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
