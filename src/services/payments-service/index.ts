import { requestError, notFoundError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { unauthorizedError } from "@/errors";

async function getPayments(ticketId: number, userId: number){
    try{
        if(!ticketId){
           throw requestError(400, "Bad Request");
        };

        const ticketIdExist = await ticketsRepository.getTicketById(ticketId);
        if(!ticketIdExist){
            throw notFoundError();
        };

        const ticketBelongUser = await enrollmentRepository.findWithAddressByUserId(userId);
        if(ticketIdExist.enrollmentId != ticketBelongUser.id){
            throw unauthorizedError();
        };

        return await paymentsRepository.getPaymentById(ticketId);
    } catch(error) {
        throw error;
    };
};

const paymentsService = {
    getPayments
};

export default paymentsService;