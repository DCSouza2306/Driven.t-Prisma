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
        const tickets = await ticketsRepository.getTickets();
        if (tickets.length == 0) {
            throw notFoundError();
        };

        return tickets;
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

        const ticketType = await ticketsRepository.getTicketsTypeById(ticketTypeId);
        if(!ticketType) {
            throw notFoundError();
        }

        return await ticketsRepository.createTicket(ticketType, userEnrollment)

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