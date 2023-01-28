import { prisma } from "@/config";

async function getTicketsTypes() {
    try{
        return prisma.ticketType.findMany()
    } catch(error) {
        throw error;
    }
};

const ticketsRepository = {
    getTicketsTypes
};

export default ticketsRepository;