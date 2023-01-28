import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPayments } from "@/controllers/payments-controller";

const paymentRouter = Router();
paymentRouter
    .all("/*", authenticateToken)
    .get("/",getPayments)


export { paymentRouter };