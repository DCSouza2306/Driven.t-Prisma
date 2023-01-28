import { Request, Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function getTicketsTypes(req: Request, res: Response) {
    try {
        const tickets = await ticketsService.getTicketsTypes();
        return res.status(httpStatus.OK).send(tickets);
    } catch (error) {
        res.sendStatus(httpStatus.OK)
    }
};

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId
    try {
        const tickets = await ticketsService.getTickets(userId);
        return res.status(httpStatus.OK).send(tickets);
    } catch (error) {
        if (error.name == "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}