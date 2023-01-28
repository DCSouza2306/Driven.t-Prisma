import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
    try {
        return await ticketsRepository.getTicketsTypes();
    } catch (error) {
        throw error;
    }
}

const ticketsService = {
    getTicketsTypes
};

export default ticketsService