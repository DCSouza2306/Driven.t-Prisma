import joi from "joi";
import { payment } from "@/protocols";

export const paymentSchema = joi.object<payment>({
  ticketId: joi.number().required(),
  cardData: joi
    .object({
      issuer: joi.string().allow("VISA", "MASTERCARD").required(),
      number: joi.number().required(),
      name: joi.string().required(),
      expirationDate: joi.string().required(),
      cvv: joi.number().required(),
    })
    .required(),
});
