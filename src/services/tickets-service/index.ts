import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getTicketsTypes() {
  return await ticketsRepository.getTicketsTypes();
}

async function getTickets(id: number) {
  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(id);
  if (!userEnrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.getTickets();
  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!userEnrollment) {
    throw notFoundError();
  }

  const TicketType = await ticketsRepository.getTicketsTypeById(ticketTypeId);
  if (!TicketType) {
    throw notFoundError();
  }

  const ticket = await ticketsRepository.createTicket(TicketType, userEnrollment);
  return { ...ticket, TicketType };
}

const ticketsService = {
  getTicketsTypes,
  getTickets,
  postTicket,
};

export default ticketsService;
