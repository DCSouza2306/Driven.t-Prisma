import { authenticateToken } from "@/middlewares";
import { Router } from "express";
import { getTicketsTypes } from "@/controllers";

const ticketsRouter = Router();
ticketsRouter
    .all("/*", authenticateToken)
    .get("/types", getTicketsTypes)

export { ticketsRouter };