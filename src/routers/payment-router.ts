import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPayments, postPayment } from "@/controllers/payments-controller";
import { validateBody } from "@/middlewares";
import { paymentSchema } from "@/schemas/payment-schema";

const paymentRouter = Router();
paymentRouter
    .all("/*", authenticateToken)
    .get("/", getPayments)
    .post("/process", validateBody(paymentSchema), postPayment)


export { paymentRouter };