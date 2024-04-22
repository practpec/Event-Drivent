import { Router } from "express";
import { createPaymentController } from "./dependencies";

const paymentRouter = Router()

paymentRouter.post("/", createPaymentController.run.bind(createPaymentController))

export default paymentRouter;