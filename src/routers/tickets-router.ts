import { authenticateToken } from "@/middlewares";
import { Router } from "express";
import { getTicketsTypes, getTickets } from "@/controllers";

const ticketsRouter = Router();
ticketsRouter
    .all("/*", authenticateToken)
    .get("/types", getTicketsTypes)
    .get("/", getTickets)

export { ticketsRouter };