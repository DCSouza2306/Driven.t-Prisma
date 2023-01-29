import { requestError, notFoundError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { unauthorizedError } from "@/errors";
import { payment } from "@/protocols";

async function getPayments(ticketId: number, userId: number) {
  if (!ticketId) {
    throw requestError(400, "Bad Request");
  }

  const ticketIdExist = await ticketsRepository.getTicketById(ticketId);
  if (!ticketIdExist) {
    throw notFoundError();
  }

  const ticketBelongUser = await enrollmentRepository.findWithAddressByUserId(userId);
  if (ticketIdExist.enrollmentId != ticketBelongUser.id) {
    throw unauthorizedError();
  }

  return await paymentsRepository.getPaymentByTicketId(ticketId);
}

async function postPayment(payment: payment, userId: number) {
  const ticketIdExist = await ticketsRepository.getTicketById(payment.ticketId);
  if (!ticketIdExist) {
    throw notFoundError();
  }
  const ticketBelongUser = await enrollmentRepository.findWithAddressByUserId(userId);
  if (ticketIdExist.enrollmentId != ticketBelongUser.id) {
    throw unauthorizedError();
  }

  const ticketType = await ticketsRepository.getTicketsTypeById(ticketIdExist.ticketTypeId);

  const newPayment = await paymentsRepository.postPayment(payment, ticketType.price);

  await ticketsRepository.updateTicket(ticketIdExist.id);

  return newPayment;
}

const paymentsService = {
  getPayments,
  postPayment,
};

export default paymentsService;
