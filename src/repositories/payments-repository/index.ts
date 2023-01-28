import { prisma } from "@/config";
import { payment } from "@/protocols";

async function getPaymentByTicketId(ticketId: number){
    try{
        return prisma.payment.findFirst({
            where: {
                ticketId
            }
        })
    } catch(error) {
        throw error;
    }
};

async function postPayment(payment: payment, value: number){
    try{
        return prisma.payment.create({
            data: {
                ticketId: payment.ticketId,
                value,
                cardIssuer: payment.cardData.issuer,
                cardLastDigits: payment.cardData.number.toString().substring(-4)
            }
        });
    } catch(error) {
        throw error;
    };
};

const paymentsRepository = {
    getPaymentByTicketId,
    postPayment
};

export default paymentsRepository