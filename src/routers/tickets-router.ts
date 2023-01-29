import { authenticateToken } from "@/middlewares";
import { Router } from "express";
import { getTicketsTypes, getTickets, postTicket } from "@/controllers";
import { validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas/tickets-schema";

const ticketsRouter = Router();
ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTickets)
  .post("/", validateBody(ticketSchema), postTicket);

export { ticketsRouter };
