import { prisma } from '../config';

export async function getTicketByEnrollmentId(enrollmentId: number) {
  try {
    const ticket = await prisma.ticket.findFirst({ where: { enrollmentId }, include: { TicketType: true } });
    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error('Internal Server Error');
  }
}
