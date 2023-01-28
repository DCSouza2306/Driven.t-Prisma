import { prisma } from "@/config";
import { TicketType, Enrollment, Address } from "@prisma/client";


async function getTicketsTypes() {
    try {
        return prisma.ticketType.findMany()
    } catch (error) {
        throw error;
    }
};

async function getTicketsTypeById(id: number) {
    try {
        return prisma.ticketType.findFirst({
            where: { id }
        })
    } catch (error) {
        throw error;
    };
}

async function getTickets() {
    try {
        return prisma.ticket.findMany({
            select: {
                id: true,
                status: true,
                ticketTypeId: true,
                enrollmentId: true,
                TicketType: true,
                createdAt: true,
                updatedAt: true
            }
        })
    } catch (error) {
        throw error;
    }
};

async function getTicketById(id: number){
    try {
        return prisma.ticket.findFirst({
            where: { id }
        })
    } catch (error) {
        throw error;
    };
}

async function createTicket(ticketType: TicketType, userEnrollment: Enrollment & { Address: Address[] }) {
    try {
        return prisma.ticket.create({
            data:{
                ticketTypeId: ticketType.id,
                enrollmentId: userEnrollment.id,
                status: "RESERVED"
            }
        })
    } catch (error) {
        throw error;
    }
}

const ticketsRepository = {
    getTicketsTypes,
    getTickets,
    createTicket,
    getTicketsTypeById,
    getTicketById
};

export default ticketsRepository;