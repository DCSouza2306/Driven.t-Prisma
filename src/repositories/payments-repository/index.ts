import { prisma } from "@/config";
import { payment } from "@/protocols";

async function getPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function postPayment(payment: payment, value: number) {
  return prisma.payment.create({
    data: {
      ticketId: payment.ticketId,
      value,
      cardIssuer: payment.cardData.issuer,
      cardLastDigits: payment.cardData.number
        .toString()
        .substring(payment.cardData.number.toString().length - 4, payment.cardData.number.toString().length),
    },
  });
}

const paymentsRepository = {
  getPaymentByTicketId,
  postPayment,
};

export default paymentsRepository;
