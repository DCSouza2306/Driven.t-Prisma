import { prisma } from "@/config";

async function getTicketsTypes() {
    try{
        return prisma.ticketType.findMany()
    } catch(error) {
        throw error;
    }
};

async function getTickets(){
    try{
        return prisma.ticket.findMany({
            select:{
                id: true,
                status: true,
                ticketTypeId: true,
                enrollmentId: true,
                TicketType: true,
                createdAt: true,
                updatedAt: true
            }
        })
    } catch(error){
        throw error;
    }
}

const ticketsRepository = {
    getTicketsTypes,
    getTickets
};

export default ticketsRepository;