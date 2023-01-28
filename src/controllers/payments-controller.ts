import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
    const { ticketId } = req.query as Record<string, string>;
    const userId = req.userId;

    try {
        const payments = await paymentsService.getPayments(parseInt(ticketId), userId);
        res.status(httpStatus.OK).send(payments)
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
};
