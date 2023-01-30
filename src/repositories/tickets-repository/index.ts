import { prisma } from "@/config";
import dayjs from "dayjs";

async function getTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function getTicketsTypeById(id: number) {
  return prisma.ticketType.findFirst({
    where: { id },
  });
}

async function getTickets() {
  return prisma.ticket.findFirst({
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function getTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: { id },
  });
}

async function createTicket(ticketTypeId: number, enrollmentId: number ) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED",
    },
  });
}

async function updateTicket(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
      updatedAt: dayjs().toISOString(),
    },
  });
}

const ticketsRepository = {
  getTicketsTypes,
  getTickets,
  createTicket,
  getTicketsTypeById,
  getTicketById,
  updateTicket,
};

export default ticketsRepository;
