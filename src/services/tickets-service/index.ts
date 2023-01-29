import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getTicketsTypes() {
    try {
        return await ticketsRepository.getTicketsTypes();
    } catch (error) {
        throw error;
    }
};

async function getTickets(id: number) {
    try {
        const userEnrollment = await enrollmentRepository.findWithAddressByUserId(id);
        if (!userEnrollment) {
            throw notFoundError();
        };
        const ticket = await ticketsRepository.getTickets();
        if (!ticket) {
            throw notFoundError();
        };

        return ticket
    } catch (error) {
        throw error;
    }
};

async function postTicket(userId: number, ticketTypeId: number) {
    try {
        const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
        if (!userEnrollment) {
            throw notFoundError();
        };

        const TicketType = await ticketsRepository.getTicketsTypeById(ticketTypeId);
        if(!TicketType) {
            throw notFoundError();
        }

        const ticket = await ticketsRepository.createTicket(TicketType, userEnrollment);
        return {...ticket,TicketType}
    } catch (error) {
        throw error;
    }
}

const ticketsService = {
    getTicketsTypes,
    getTickets,
    postTicket
};

export default ticketsService;