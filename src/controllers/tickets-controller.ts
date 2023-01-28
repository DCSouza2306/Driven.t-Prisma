import { Request, Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function getTicketsTypes(req: Request, res: Response){
    try{
        const tickets = await ticketsService.getTicketsTypes();
        return res.status(httpStatus.OK).send(tickets);
    } catch(error) {
        res.sendStatus(httpStatus.OK)
    }
};