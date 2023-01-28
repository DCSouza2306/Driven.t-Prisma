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
        if (error.name == "RequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error.message);
        };

        if (error.name == "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        };
        if (error.name == "UnauthorizedError") {
            return res.status(httpStatus.UNAUTHORIZED).send({ message: "Ticket does not belong this user" });
        };
        console.log(error);
    }
};
